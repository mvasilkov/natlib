/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Paint interface */
export interface IPaint {
    paint(con: CanvasRenderingContext2D, t: number): any
}
