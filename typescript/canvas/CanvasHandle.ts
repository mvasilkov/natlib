/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Rendering function type */
type RenderingFunction = (con: CanvasRenderingContext2D, width: number, height: number) => void

/** Canvas handle class */
export class CanvasHandle {
    readonly canvas: HTMLCanvasElement
    readonly con: CanvasRenderingContext2D
    readonly height: number
    readonly width: number

    constructor(canvas: HTMLCanvasElement, width: number, height: number, ini?: RenderingFunction) {
        this.canvas = canvas
        this.con = canvas.getContext('2d')!
        this.height = height
        this.width = width

        if (devicePixelRatio > 1) {
            // High DPI
            canvas.height = 2 * height
            canvas.width = 2 * width

            this.con.scale(2, 2)
        }
        else {
            canvas.height = height
            canvas.width = width
        }

        if (ini) ini(this.con, width, height)
    }
}
