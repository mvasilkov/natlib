/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import type { ExtendedBool } from '../prelude'
import { register0, type Vec2 } from '../Vec2.js'
import type { Body } from './Body'
import type { Vertex } from './Vertex'

/** Constraint class (Verlet integration) */
export class Constraint {
    readonly body: Body
    readonly v0: Vertex
    readonly v1: Vertex
    /** Position of v0 */
    readonly p0: Vec2
    /** Position of v1 */
    readonly p1: Vec2

    lengthSquared: number
    edge: ExtendedBool
    stiffness: number

    constructor(body: Body, v0: Vertex, v1: Vertex, edge: ExtendedBool, stiffness = 1) {
        this.body = body
        this.v0 = v0
        this.v1 = v1
        this.p0 = v0.position // .InlineExp
        this.p1 = v1.position // .InlineExp

        this.lengthSquared = this.p0.distanceSquared(this.p1)
        this.edge = edge
        this.stiffness = stiffness

        if (!this.lengthSquared) throw Error('Overlapping vertices')

        body.constraints.push(this)
        if (edge) body.edges.push(this)
        body.scene.constraints.push(this)
    }

    /** Solve the constraint. */
    solve(): void {
        // Algorithm by Thomas Jakobsen (2001)
        register0.setSubtract(this.p0, this.p1).scale(
            // Approximate the square root function.
            (this.lengthSquared / (register0.dot(register0) + this.lengthSquared) - 0.5) * this.stiffness)

        this.p0.add(register0)
        this.p1.subtract(register0)
    }
}
