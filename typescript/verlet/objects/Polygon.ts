/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { Body } from '../Body.js'
import { Constraint } from '../Constraint.js'
import type { Scene } from '../Scene'
import { Vertex } from '../Vertex.js'

/** Convex regular n-gon class (Verlet integration) */
export class Polygon extends Body {
    constructor(scene: Scene, N: number, x: number, y: number, r: number, rotate = 0, gravity = 0, viscosity = 1, stiffness = 1, mass = 1, groundFriction = 0) {
        super(scene, mass, groundFriction)

        // Create vertices
        const theta = 2 * Math.PI / N

        for (let n = 0; n < N; ++n) {
            const a = theta * n + rotate
            new Vertex(this, x + r * Math.cos(a), y + r * Math.sin(a), gravity, viscosity)
        }

        // Create constraints
        const edgeIndices = new Set([1, N - 1])

        for (let i = N; --i > 0;) {
            for (let j = i; --j >= 0;) {
                new Constraint(this, this.vertices[i]!, this.vertices[j]!, edgeIndices.has(i - j), stiffness)
            }
        }
    }
}
