/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

/** Rendering function type */
export type RenderingFunction = (con: CanvasRenderingContext2D, width: number, height: number) => void

/** Canvas handle class */
export class CanvasHandle {
    readonly canvas: HTMLCanvasElement
    readonly con: CanvasRenderingContext2D
    readonly height: number
    readonly width: number

    constructor(canvas: HTMLCanvasElement | null, width: number, height: number, supersampling = 2, ini?: RenderingFunction) {
        canvas ??= document.createElement('canvas')

        this.canvas = canvas
        this.con = canvas.getContext('2d')!
        this.height = height
        this.width = width

        canvas.height = supersampling * height
        canvas.width = supersampling * width

        this.con.scale(supersampling, supersampling)

        ini?.(this.con, width, height)
    }
}
