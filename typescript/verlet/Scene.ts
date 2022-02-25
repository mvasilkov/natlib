/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { findCollision, resolveCollision } from '../collision/sat.js'
import type { Body } from './Body'
import type { Constraint } from './Constraint'
import type { Vertex } from './Vertex'

/** Scene class (Verlet integration) */
export class Scene {
    vertices: Vertex[]
    constraints: Constraint[]
    bodies: Body[]

    height: number
    width: number
    iterationCount: number

    constructor(width: number, height: number, iterationCount = 9) {
        this.vertices = []
        this.constraints = []
        this.bodies = []

        this.height = height
        this.width = width
        this.iterationCount = iterationCount
    }

    /** Update the scene. */
    update() {
        // Verlet integration loop
        for (const v of this.vertices) {
            v.integrate(this.width, this.height)
        }

        // Solve constraints and collisions.
        for (let n = 0; n < this.iterationCount; ++n) {
            for (const c of this.constraints) {
                c.solve()
            }

            for (const b of this.bodies) {
                b.updateBoundingBox()
            }

            // Resolve collisions.
            for (let i = this.bodies.length; --i > 0;) {
                const b0 = this.bodies[i]!

                for (let j = i; --j >= 0;) {
                    const b1 = this.bodies[j]!

                    if (findCollision(b0, b1)) {
                        resolveCollision(b0, b1)
                    }
                }
            }
        }
    }
}
