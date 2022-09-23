/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

export function setTextStyle(con: CanvasRenderingContext2D, style: string) {
    con.font = style + `px -apple-system, 'Segoe UI', 'DejaVu Sans', system-ui, sans-serif`
}
