/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Vec2 } from '../Vec2.js'
import type { Body } from './Body'
import type { Vertex } from './Vertex'

/** Constraint class (Verlet integration) */
export class Constraint {
    body: Body
    v0: Vertex
    v1: Vertex
    /** Position of v0 */
    p0: Vec2
    /** Position of v1 */
    p1: Vec2

    lengthSquared: number
    edge: boolean
    stiffness: number

    constructor(body: Body, v0: Vertex, v1: Vertex, edge: boolean, stiffness = 1) {
        this.body = body
        this.v0 = v0
        this.v1 = v1
        this.p0 = v0.position
        this.p1 = v1.position

        this.lengthSquared = this.p0.distanceSquared(this.p1)
        this.edge = edge
        this.stiffness = stiffness
    }

    /** Solve the constraint. */
    solve() {
    }
}

/** Exact constraint class (Verlet integration) */
export class ExactConstraint extends Constraint {
    length: number

    constructor(body: Body, v0: Vertex, v1: Vertex, edge: boolean, stiffness = 1) {
        super(body, v0, v1, edge, stiffness)
        this.length = this.lengthSquared ** 0.5
    }
}
