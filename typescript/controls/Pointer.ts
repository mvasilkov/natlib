/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { CanvasHandle } from '../canvas/CanvasHandle'
import type { IVec2 } from '../Vec2'

/** Pointer controls data structure */
export interface IPointer<T> extends IVec2 {
    x: number
    y: number
    held: boolean
    state?: T
}

/** Pointer controls class */
export class Pointer<T> implements IPointer<T> {
    x: number
    y: number
    held: boolean
    state?: T

    readonly canvas: CanvasHandle

    constructor(canvas: CanvasHandle) {
        this.x = this.y = 0
        this.held = false

        this.canvas = canvas
    }
}
