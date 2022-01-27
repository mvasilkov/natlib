/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { CanvasHandle } from './CanvasHandle.js'

/** Paint interface */
export interface IPaint {
    paint(con: CanvasRenderingContext2D, t: number): void
}

/** Rendering function type */
type RenderingFunction = (con: CanvasRenderingContext2D) => void

/** Render to a new canvas */
export function rasterize(width: number, height: number, fn: RenderingFunction): CanvasHandle {
    const handle = new CanvasHandle(document.createElement('canvas'), width, height)
    fn(handle.con)
    return handle
}
