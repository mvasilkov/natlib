/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { lerp } from '../interpolation.js'
import { Vec2 } from '../Vec2.js'
import type { Body } from './Body'

/** Vertex class (Verlet integration) */
export class Vertex {
    body: Body
    position: Vec2
    oldPosition: Vec2
    interpolated: Vec2

    gravity: number
    viscosity: number

    constructor(body: Body, x: number, y: number, gravity = 0, viscosity = 1) {
        this.body = body
        this.position = new Vec2(x, y)
        this.oldPosition = new Vec2(x, y)
        this.interpolated = new Vec2(x, y)

        this.gravity = gravity
        this.viscosity = viscosity

        body.vertices.push(this)
        body.positions.push(this.position)
        body.scene.vertices.push(this)
    }

    /** Verlet integration */
    integrate(sceneWidth: number, sceneHeight: number) {
    }

    /** Interpolate the position of the vertex. */
    interpolate(t: number) {
        this.interpolated.set(
            lerp(this.oldPosition.x, this.position.x, t),
            lerp(this.oldPosition.y, this.position.y, t))
    }
}
