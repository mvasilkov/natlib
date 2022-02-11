/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { register0 } from '../../runtime.js'
import { Vec2 } from '../../Vec2.js'
import type { Body } from '../Body'
import type { Constraint } from '../Constraint'

/** Projected distance function */
export function projectedDistance(b0: Body, b1: Body, edge: Constraint): number {
    // Find a unit vector normal to the edge.
    register0.setPerpendicular(edge.p0, edge.p1)
    register0.normalize()

    // Project the bodies onto the normal.
    b0.projectInterval(register0)
    b1.projectInterval(register0)

    // Return the distance between the intervals.
    return b0.intervalLeft < b1.intervalLeft ?
        b1.intervalLeft - b0.intervalRight :
        b0.intervalLeft - b1.intervalRight
}

// Properties of last collision
const collisionLine = new Vec2
let collisionDistance: number
let collisionEdge: Constraint

/** Collision detection function using the Separating Axis Theorem (SAT) */
export function findCollision(b0: Body, b1: Body): boolean {
    const length0 = b0.edges.length
    const length1 = b1.edges.length
    if (length0 === 0 || length1 === 0) return false

    // AABB overlap test
    if (Math.abs(b1.center.x - b0.center.x) >= b0.halfExtents.x + b1.halfExtents.x ||
        Math.abs(b1.center.y - b0.center.y) >= b0.halfExtents.y + b1.halfExtents.y)
        // AABBs don't overlap
        return false

    collisionDistance = projectedDistance(b0, b1, collisionEdge = b0.edges[0]!)
    // If the intervals don't overlap, there is no collision.
    if (collisionDistance >= 0) return false
    collisionLine.copy(register0)

    // Loop over `b1.edges` then `b0.edges`, excluding `b0.edges[0]`.
    for (let n = length0 + length1; --n > 0;) {
        const edge = n < length0 ? b0.edges[n]! : b1.edges[n - length0]!
        const distance = projectedDistance(b0, b1, edge)

        if (distance >= 0) return false
        if (distance > collisionDistance) {
            collisionDistance = distance
            collisionLine.copy(register0)
            collisionEdge = edge
        }
    }

    // If there is no separating axis, then the bodies are colliding.
    return true
}

/** Resolve last collision found by findCollision(). */
export function resolveCollision(b0: Body, b1: Body) {
    // Put collision edge in `b1` and collision vertex in `b0`.
    if (collisionEdge.body !== b1) {
        const t = b0
        b0 = b1
        b1 = t
    }

    // Make sure that the collision line is pointing from `b0` to `b1`.
    register0.setSubtract(b1.center, b0.center)
    if (collisionLine.dot(register0) < 0) {
        collisionLine.scale(-1)
    }

    // Find the collision vertex.
    const collisionVertex = b0.farthestPointInDirection(collisionLine)
}
