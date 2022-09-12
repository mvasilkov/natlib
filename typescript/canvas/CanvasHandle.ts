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

    constructor(canvas: HTMLCanvasElement | null, width: number, height: number, supersampling = 2, ini?: RenderingFunction) {
        if (!canvas) {
            canvas = document.createElement('canvas')
        }

        this.canvas = canvas
        this.con = canvas.getContext('2d')!
        this.height = height
        this.width = width

        canvas.height = supersampling * height
        canvas.width = supersampling * width

        this.con.scale(supersampling, supersampling)

        if (ini) ini(this.con, width, height)
    }
}
