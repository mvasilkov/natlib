/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import type { IVec2 } from '../Vec2'
import type { Body } from './Body'
import { Vertex } from './Vertex.js'

/** Static vertex class (Verlet integration) */
export class StaticVertex extends Vertex implements IVec2 {
    x: number
    y: number

    constructor(body: Body, x: number, y: number) {
        super(body, x, y)

        this.x = x
        this.y = y
    }

    override integrate() {
        this.position.set(this.x, this.y)
        this.oldPosition.set(this.x, this.y)
    }
}
