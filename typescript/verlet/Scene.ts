/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'
import type { Constraint } from './Constraint'
import type { Vertex } from './Vertex'

/** Scene class (Verlet integration) */
export class Scene {
    readonly vertices: Vertex[]
    readonly constraints: Constraint[]
    readonly bodies: Body[]

    height: number
    width: number
    iterationCount: number

    constructor(width: number, height: number, iterationCount: number) {
        this.vertices = []
        this.constraints = []
        this.bodies = []

        this.height = height
        this.width = width
        this.iterationCount = iterationCount
    }

    /** Update the scene. */
    update() {
        // Verlet integration
        this.vertices.forEach(v => v.integrate())

        // Solve constraints
        for (let n = 0; n < this.iterationCount; ++n) {
            this.constraints.forEach(c => c.solve())
        }
    }
}
