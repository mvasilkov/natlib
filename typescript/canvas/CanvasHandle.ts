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
    height!: number
    width!: number

    constructor(canvas: HTMLCanvasElement | null, width: number, height: number, supersampling = 2, ini?: RenderingFunction) {
        canvas ??= document.createElement('canvas')

        this.canvas = canvas
        this.con = canvas.getContext('2d')!

        this.reset(width, height, supersampling)

        ini?.(this.con, width, height)
    }

    reset(width: number, height: number, supersampling = 2) {
        this.height = height
        this.width = width

        this.canvas.height = supersampling * height
        this.canvas.width = supersampling * width

        this.con.scale(supersampling, supersampling)
    }
}
