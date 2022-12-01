/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { ShortBool, TRUE } from '../prelude.js'
import { register0, register1 } from '../runtime.js'
import type { Body } from '../verlet/Body'
import type { Constraint } from '../verlet/Constraint'

const projectionLine = register0

/** Projected distance function */
function projectedDistance(b0: Body, b1: Body, edge: Constraint): number {
    // Find a unit vector normal to the edge.
    projectionLine.setPerpendicular(edge.p0, edge.p1).normalize()

    // Project the bodies onto the normal.
    b0.projectInterval(projectionLine)
    b1.projectInterval(projectionLine)

    // Return the distance between the intervals.
    return b0.intervalLeft < b1.intervalLeft ?
        b1.intervalLeft - b0.intervalRight :
        b0.intervalLeft - b1.intervalRight
}

// Contact properties
const contactLine = register1
let contactEdge: Constraint
let contactLeftIndex: number
let contactRightIndex: number
let contactDistance: number

/** Collision detection function using the Separating Axis Theorem (SAT) */
export function findCollision(b0: Body, b1: Body): ShortBool {
    const length0 = b0.edges.length
    const length1 = b1.edges.length
    if (length0 === 0 || length1 === 0) return

    // AABB overlap test
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
    return TRUE
}
