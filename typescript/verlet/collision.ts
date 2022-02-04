/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { register0 } from '../runtime.js'
import { Vec2 } from '../Vec2.js'
import type { Body } from './Body'
import type { Constraint } from './Constraint'
import type { Vertex } from './Vertex'

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

// Values returned by findCollision()
const collisionLine = new Vec2
let collisionDistance: number
let collisionEdge: Constraint
let collisionVertex: Vertex

/** Collision detection function using the Separating Axis Theorem (SAT) */
export function findCollision(b0: Body, b1: Body): boolean {
    if (b0.edges.length === 0 || b1.edges.length === 0) return false

    // AABB overlap test
    if (Math.abs(b1.center.x - b0.center.x) >= b0.halfExtents.x + b1.halfExtents.x ||
        Math.abs(b1.center.y - b0.center.y) >= b0.halfExtents.y + b1.halfExtents.y)
        // AABBs don't overlap
        return false

    collisionDistance = projectedDistance(b0, b1, collisionEdge = b0.edges[0]!)
    // If the projections don't overlap, there is no collision.
    if (collisionDistance >= 0) return false
    collisionLine.copy(register0)

    // Loop over b0.edges, excluding b0.edges[0].
    for (let n = b0.edges.length; --n > 0;) {
        const edge = b0.edges[n]!
    }

    for (const edge of b1.edges) {
    }
}

/** Resolve last collision found by findCollision(). */
export function resolveCollision() {
}
