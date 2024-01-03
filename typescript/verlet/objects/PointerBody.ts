/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import type { IVec2 } from '../../Vec2'
import { Body } from '../Body.js'
import { Scene } from '../Scene.js'

/** Pointer body class for collision detection */
export class PointerBody extends Body {
    readonly r: number

    constructor(r: number) {
        const detached = new Scene(r, r, 0)
        super(detached)

        this.halfExtents.set(this.r = r, r)
    }

    /** Project the body onto a unit vector. */
    override projectInterval(direction: Readonly<IVec2>) {
        const distanceInDirection = this.center.dot(direction)

        this.intervalLeft = distanceInDirection - this.r
        this.intervalRight = distanceInDirection + this.r
    }

    /** Set the pointer position. */
    setPosition(position: Readonly<IVec2>) {
        this.center.copy(position)
    }
}
