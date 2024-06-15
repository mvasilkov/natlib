/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { lerp } from '../interpolation.js'
import { Vec2 } from '../Vec2.js'
import type { Body } from './Body'

/** Vertex class (Verlet integration) */
export class Vertex {
    readonly body: Body
    readonly position: Vec2
    readonly oldPosition: Vec2
    readonly interpolated: Vec2

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
    integrate(): void {
        const pos = this.position
        const old = this.oldPosition
        const x = pos.x
        const y = pos.y

        pos.x += (x - old.x) * this.viscosity
        pos.y += (y - old.y) * this.viscosity + this.gravity

        old.set(x, y)

        // Scene bounds
        const { height, width } = this.body.scene

        if (pos.y < 0) pos.y = 0
        else if (pos.y >= height) {
            pos.x += (x - pos.x) * this.body.groundFriction
            pos.y = height - 1
        }

        if (pos.x < 0) pos.x = 0
        else if (pos.x >= width) {
            pos.x = width - 1
        }
    }

    /** Interpolate the vertex position. */
    interpolate(t: number): void {
        this.interpolated.set(
            lerp(this.oldPosition.x, this.position.x, t),
            lerp(this.oldPosition.y, this.position.y, t))
    }
}
