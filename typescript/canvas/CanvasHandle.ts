/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'

/** Canvas handle class */
export class CanvasHandle {
    readonly canvas: HTMLCanvasElement
    readonly con: CanvasRenderingContext2D
    readonly height: number
    readonly width: number

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas
        this.con = canvas.getContext('2d')!
        this.height = height
        this.width = width

        if (devicePixelRatio > 1.4) {
            canvas.height = 2 * height
            canvas.width = 2 * width

            this.con.scale(2, 2)
        }
        else {
            canvas.height = height
            canvas.width = width
        }
    }
}
