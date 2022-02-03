/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { register0 } from '../runtime.js'
import type { Body } from './Body'
import type { Constraint } from './Constraint'

/** Projected distance function */
export function projectedDistance(b0: Body, b1: Body, edge: Constraint): number {
    // Find a unit vector normal to the edge.
    register0.setPerpendicular(edge.p0, edge.p1)
    register0.normalize()

    // Project the bodies onto the normal.
    b0.projectOnto(register0)
    b1.projectOnto(register0)

    // Return the distance between the projections.
    return b0.projectionMin < b1.projectionMin ?
        b1.projectionMin - b0.projectionMax :
        b0.projectionMin - b1.projectionMax
}

/** Collision detection function using the Separating Axis Theorem (SAT) */
export function findCollision(b0: Body, b1: Body): boolean {
}

/** Resolve last collision found by findCollision(). */
export function resolveCollision() {
}
