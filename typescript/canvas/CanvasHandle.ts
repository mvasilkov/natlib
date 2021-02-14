/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="../natlib.d.ts" />

/** Canvas handle class */
class CanvasHandle {
    canvas: HTMLCanvasElement
    con: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas
        this.con = canvas.getContext('2d')!

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
