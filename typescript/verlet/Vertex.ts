/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'
import { Vec2 } from '../Vec2.js'

/** Vertex class (Verlet integration) */
export class Vertex {
    body: Body
    position: Vec2
    oldPosition: Vec2

    constructor(body: Body, x: number, y: number) {
        this.body = body
        this.position = new Vec2(x, y)
        this.oldPosition = new Vec2(x, y)

        body.vertices.push(this)
        body.positions.push(this.position)
        body.scene.vertices.push(this)
    }

    /** Verlet integration */
    integrate() {
    }
}
