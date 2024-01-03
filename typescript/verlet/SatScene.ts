/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { findCollision, resolveCollision } from '../collision/sat.js'
import { Scene } from './Scene.js'

/** Scene class using SAT collision detection (Verlet integration) */
export class SatScene extends Scene {
    friction: number

    constructor(width: number, height: number, iterationCount: number, friction = 0) {
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

            for (let i = this.bodies.length; --i > 0;) {
                const b0 = this.bodies[i]!

                for (let j = i; --j >= 0;) {
                    const b1 = this.bodies[j]!

                    if (findCollision(b0, b1)) {
                        resolveCollision(b0, b1, this.friction)
                    }
                }
            }
        }
    }
}
