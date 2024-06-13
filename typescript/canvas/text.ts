/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

/** Set the canvas text style and size, e.g. 'bold 48'. */
export const setTextStyle = (con: CanvasRenderingContext2D, style: string | number): void => {
    con.font = style + `px -apple-system, 'Segoe UI', 'DejaVu Sans', system-ui, sans-serif`
}

/** Return a path encapsulating the text. */
export const textCapsule = (con: CanvasRenderingContext2D, x: number, y: number, style: string | number, text: string, padding: number, borderRadius: number): Path2D => {
    setTextStyle(con, style)

    const textMetrics = con.measureText(text)

    const left = textMetrics.actualBoundingBoxLeft
    const up = textMetrics.actualBoundingBoxAscent
    const right = textMetrics.actualBoundingBoxRight
    const down = textMetrics.actualBoundingBoxDescent

    const paddingExt = padding - borderRadius
    const horizontalPartLength = left + right + paddingExt + paddingExt
    const verticalPartLength = up + down + paddingExt + paddingExt

    return new Path2D(
        `M${x - left - padding},${y - up - paddingExt}` +
        `q0,${-borderRadius},${borderRadius},${-borderRadius}` +
        `h${horizontalPartLength}` +
        `q${borderRadius},0,${borderRadius},${borderRadius}` +
        `v${verticalPartLength}` +
        `q0,${borderRadius},${-borderRadius},${borderRadius}` +
        `h${-horizontalPartLength}` +
        `q${-borderRadius},0,${-borderRadius},${-borderRadius}` +
        `z`)
}
