/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { ShortBool, type ExtendedBool } from '../prelude.js'
import { register0, register1, register2 } from '../Vec2.js'
import type { Body } from '../verlet/Body'
import type { Constraint } from '../verlet/Constraint'

const projectionLine = register0 // .Alias

/** Projected distance function */
const projectedDistance = (b0: Body, b1: Body, edge: Constraint): number => {
    // Find a unit vector normal to the edge.
    projectionLine.setSubtract(edge.p1, edge.p0)
        .setPerpendicular(projectionLine).normalize()

    // Project the bodies onto the normal.
    b0.projectInterval(projectionLine)
    b1.projectInterval(projectionLine)

    // Return the distance between the intervals.
    return b0.intervalLeft < b1.intervalLeft ?
        b1.intervalLeft - b0.intervalRight :
        b0.intervalLeft - b1.intervalRight
}

// Contact properties
const contactLine = register1 // .Alias
let contactEdge: Constraint
let contactLeftIndex: number
let contactRightIndex: number
let contactDistance: number

/** Collision detection function using the Separating Axis Theorem (SAT) */
export const findCollision = (b0: Body, b1: Body): ExtendedBool => {
    const length0 = b0.edges.length
    const length1 = b1.edges.length // .Inline
    if (length0 === 0) return

    // Check AABB overlap
    if (Math.abs(b1.center.x - b0.center.x) >= b0.halfExtents.x + b1.halfExtents.x ||
        Math.abs(b1.center.y - b0.center.y) >= b0.halfExtents.y + b1.halfExtents.y)
        // AABBs don't overlap
        return

    contactDistance = projectedDistance(b0, b1, contactEdge = b0.edges[0]!)
    // If the intervals don't overlap, there is no collision.
    if (contactDistance >= 0) return
    contactLine.copy(projectionLine)
    contactLeftIndex = b1.leftIndex
    contactRightIndex = b1.rightIndex

    // Loop over `b1.edges` then `b0.edges`, excluding `b0.edges[0]`.
    for (let n = length0 + length1; --n > 0;) {
        const edge = n < length0 ? b0.edges[n]! : b1.edges[n - length0]!
        const distance = projectedDistance(b0, b1, edge)

        if (distance >= 0) return
        if (distance > contactDistance) {
            contactDistance = distance
            contactLine.copy(projectionLine)
            contactEdge = edge
            // If contact edge is in `b0`, save indices from `b1`, and vice versa.
            if (n < length0) {
                contactLeftIndex = b1.leftIndex
                contactRightIndex = b1.rightIndex
            }
            else {
                contactLeftIndex = b0.leftIndex
                contactRightIndex = b0.rightIndex
            }
        }
    }

    // If there is no separating axis, then the bodies are colliding.
    return ShortBool.TRUE
}

/** Resolve the last collision found by `findCollision()`. */
export const resolveCollision = (b0: Body, b1: Body, friction: number): void => {
    // Put the contact edge in `b1` and the contact vertex in `b0`.
    if (contactEdge.body === b0) {
        const t = b0
        b0 = b1
        b1 = t
    }

    let contactVertex = b0.vertices[contactRightIndex]!

    // Make sure that the contact line is pointing from `b0` to `b1`.
    if (contactLine.dot(register0.setSubtract(b1.center, b0.center)) < 0) {
        contactLine.scale(-1)
        contactVertex = b0.vertices[contactLeftIndex]!
    }

    const pos = contactVertex.position
    const pos0 = contactEdge.p0
    const pos1 = contactEdge.p1

    // Response vector
    register0.setMultiplyScalar(contactLine, contactDistance)

    register2.setSubtract(pos1, pos0)

    // Find the ratio in which the contact vertex divides the contact edge.
    const t = Math.abs(register2.x) > Math.abs(register2.y) ?
        (pos.x - register0.x - pos0.x) / register2.x :
        (pos.y - register0.y - pos0.y) / register2.y

    // Mass fractions
    const totalMass = b0.mass + b1.mass
    const w0 = b0.mass / totalMass
    const w1 = b1.mass / totalMass

    // Make sure that the contact vertex lies on the contact edge.
    // λ = 1 / (t² + (1 − t)²)
    const k = w0 / (t * (t + t - 2) + 1)
    const k0 = (1 - t) * k
    const k1 = t * k

    // Apply the collision response.
    pos.add(register2.setMultiplyScalar(register0, w1))
    pos0.subtract(register2.setMultiplyScalar(register0, k0))
    pos1.subtract(register2.setMultiplyScalar(register0, k1))

    if (friction === 0) return

    const oldPos = contactVertex.oldPosition
    const oldPos0 = contactEdge.v0.oldPosition
    const oldPos1 = contactEdge.v1.oldPosition

    // Find the relative velocity.
    register2.setSubtract(pos, oldPos)
        .subtract(register0.setSubtract(pos0, oldPos0).scale(1 - t))
        .subtract(register0.setSubtract(pos1, oldPos1).scale(t))

    // Project the relative velocity onto the tangent vector.
    register0.setPerpendicular(contactLine)
        .scale(register2.dot(register0) * friction)

    // Apply the friction response.
    pos.subtract(register2.setMultiplyScalar(register0, w1))
    pos0.add(register2.setMultiplyScalar(register0, k0))
    pos1.add(register2.setMultiplyScalar(register0, k1))
}
