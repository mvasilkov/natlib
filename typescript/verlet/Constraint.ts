/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { register0 } from '../runtime.js'
import type { Vec2 } from '../Vec2'
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

        if (this.lengthSquared === 0) throw Error('Overlapping vertices')

        body.constraints.push(this)
        if (edge) body.edges.push(this)
        body.scene.constraints.push(this)
    }

    /** Solve the constraint. */
    solve() {
        // Algorithm by Thomas Jakobsen (2001)
        register0.setSubtract(this.p0, this.p1)

        // Approximate the square root function.
        register0.scale(
            (this.lengthSquared / (register0.dot(register0) + this.lengthSquared) - 0.5) * this.stiffness)

        this.p0.add(register0)
        this.p1.subtract(register0)
    }
}
