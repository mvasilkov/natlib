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
    sceneHeight: number
    sceneWidth: number

    constructor(body: Body, x: number, y: number, gravity = 0, viscosity = 1) {
        this.body = body
        this.position = new Vec2(x, y)
        this.oldPosition = new Vec2(x, y)
        this.interpolated = new Vec2(x, y)

        this.gravity = gravity
        this.viscosity = viscosity
        this.sceneHeight = body.scene.height
        this.sceneWidth = body.scene.width

        body.vertices.push(this)
        body.positions.push(this.position)
        body.scene.vertices.push(this)
    }

    /** Verlet integration */
    integrate() {
        const pos = this.position
        const old = this.oldPosition
        const x = pos.x
        const y = pos.y

        pos.x += (x - old.x) * this.viscosity
        pos.y += (y - old.y) * this.viscosity + this.gravity

        old.set(x, y)

        // Scene bounds
        if (pos.y < 0) pos.y = 0
        else if (pos.y >= this.sceneHeight) {
            pos.x += (x - pos.x) * this.body.groundFriction
            pos.y = this.sceneHeight - 1
        }

        if (pos.x < 0) pos.x = 0
        else if (pos.x >= this.sceneWidth) {
            pos.x = this.sceneWidth - 1
        }
    }

    /** Interpolate the vertex position. */
    interpolate(t: number) {
        this.interpolated.set(
            lerp(this.oldPosition.x, this.position.x, t),
            lerp(this.oldPosition.y, this.position.y, t))
    }
}
