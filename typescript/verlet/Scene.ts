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

    constructor() {
        this.vertices = []
        this.constraints = []
        this.bodies = []
    }

    /** Verlet integration loop */
    integrate() {
        for (const v of this.vertices) {
            v.integrate()
        }
    }

    /** Solve constraints and collisions. */
    solve() {
    }
}
