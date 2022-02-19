/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Body } from '../Body.js'
import { Constraint } from '../Constraint.js'
import type { Scene } from '../Scene'
import { Vertex } from '../Vertex.js'

/** Convex regular n-gon class (Verlet integration) */
export class Polygon extends Body {
    constructor(scene: Scene, x: number, y: number, r: number, nVertices = 9, stiffness = 1, mass = 1, groundFriction = 0) {
        super(scene, mass, groundFriction)

        // Create vertices
        const theta = 2 * Math.PI / nVertices

        for (let n = 0; n < nVertices; ++n) {
            const a = theta * n
            new Vertex(this, x + r * Math.cos(a), y + r * Math.sin(a))
        }

        // Create constraints
        const edgeIndices = new Set([1, nVertices - 1])

        for (let i = nVertices; --i > 0;) {
            for (let j = i; --j >= 0;) {
                new Constraint(this, this.vertices[i]!, this.vertices[j]!, edgeIndices.has(i - j), stiffness)
            }
        }

        // Set bounding box
        this.center.set(x, y)
        this.halfExtents.set(r, r)
    }
}
