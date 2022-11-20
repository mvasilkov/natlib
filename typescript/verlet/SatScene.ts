/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Scene } from './Scene.js'

/** Scene class using SAT collision detection (Verlet integration) */
export class SatScene extends Scene {
    friction: number

    constructor(width: number, height: number, iterationCount = 9, friction = 0) {
        super(width, height, iterationCount)

        this.friction = friction
    }

    /** Update the scene. */
    override update() {
        // Verlet integration
        this.vertices.forEach(v => v.integrate())

        // Solve constraints and collisions
        for (let n = 0; n < this.iterationCount; ++n) {
            this.constraints.forEach(c => c.solve())

            this.bodies.forEach(b => b.updateBoundingBox())

            // NotImplemented
        }
    }
}
