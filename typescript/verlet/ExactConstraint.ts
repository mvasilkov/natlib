/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { register0 } from '../Vec2.js'
import type { ExtendedBool } from '../prelude'
import type { Body } from './Body'
import { Constraint } from './Constraint.js'
import type { Vertex } from './Vertex'

/** Exact constraint class (Verlet integration) */
export class ExactConstraint extends Constraint {
    length: number

    constructor(body: Body, v0: Vertex, v1: Vertex, edge: ExtendedBool, stiffness = 1) {
        super(body, v0, v1, edge, stiffness)

        this.length = this.lengthSquared ** 0.5
    }

    /** Solve the constraint. */
    override solve(): void {
        const len = register0.setSubtract(this.p0, this.p1).length()
        if (len === 0) return

        register0.scale((this.length / len - 1) * this.stiffness)

        this.p0.add(register0)
        this.p1.subtract(register0)
    }
}
