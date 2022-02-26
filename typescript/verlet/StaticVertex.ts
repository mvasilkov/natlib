/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'
import { Vertex } from './Vertex.js'

/** Static vertex class (Verlet integration) */
export class StaticVertex extends Vertex {
    x: number
    y: number

    constructor(body: Body, x: number, y: number) {
        super(body, x, y)

        this.x = x
        this.y = y
    }

    /** Verlet integration */
    override integrate(_sceneWidth: number, _sceneHeight: number) {
        this.position.set(this.x, this.y)
        this.oldPosition.set(this.x, this.y)
    }
}
