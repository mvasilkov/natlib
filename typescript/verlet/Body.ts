/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Constraint } from './Constraint'
import type { Scene } from './Scene'
import type { Vertex } from './Vertex'
import { Vec2 } from '../Vec2.js'

/** Physical body class (Verlet integration) */
export class Body {
    scene: Scene
    vertices: Vertex[]
    constraints: Constraint[]
    /** Positions of vertices */
    positions: Vec2[]
    center: Vec2
    halfExtents: Vec2

    constructor(scene: Scene) {
        this.scene = scene
        this.vertices = []
        this.constraints = []
        this.positions = []
        this.center = new Vec2
        this.halfExtents = new Vec2
    }

    /** Compute the bounding box. */
    boundingBox() {
        let xMin: number, xMax: number, yMin: number, yMax: number
        let p = this.positions[0]!
        xMin = xMax = p.x
        yMin = yMax = p.y

        // Loop over positions, excluding positions[0].
        for (let n = this.positions.length; --n > 0;) {
            p = this.positions[n]!

            if (p.x < xMin) xMin = p.x
            else if (p.x > xMax) xMax = p.x

            if (p.y < yMin) yMin = p.y
            else if (p.y > yMax) yMax = p.y
        }

        this.center.set((xMin + xMax) * 0.5, (yMin + yMax) * 0.5)
        this.halfExtents.set((xMax - xMin) * 0.5, (yMax - yMin) * 0.5)
    }
}
