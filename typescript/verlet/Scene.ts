/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'
import type { Constraint } from './Constraint'
import type { Vertex } from './Vertex'

/** Scene class (Verlet integration) */
export class Scene {
    vertices: Vertex[]
    constraints: Constraint[]
    bodies: Body[]
    iterationCount: number

    constructor() {
        this.vertices = []
        this.constraints = []
        this.bodies = []
        this.iterationCount = 10
    }

    /** Verlet integration loop */
    integrate() {
        for (const v of this.vertices) {
            v.integrate()
        }
    }

    /** Solve constraints and collisions. */
    solve() {
        for (let n = 0; n < this.iterationCount; ++n) {
            // Solve constraints.
            for (const c of this.constraints) {
                c.solve()
            }

            // Recalculate bounding boxes.
            for (const b of this.bodies) {
                b.boundingBox()
            }
        }
    }
}
