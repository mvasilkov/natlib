/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { ShortBool, TRUE } from '../prelude.js'
import { register0 } from '../runtime.js'
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

    // If there is no separating axis, then the bodies are colliding.
    return TRUE
}
