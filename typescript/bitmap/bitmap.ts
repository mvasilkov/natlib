/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Function of this type is invoked by readBitmap for each pixel. */
export type ReadFunction = (x: number, y: number, value: number) => void

/** Read a bitmap stored as an array of integers. */
export function readBitmap(lines: number[], width: number, bpp: number, readFunction: ReadFunction) {
    const shift = 1 << bpp
    for (let y = 0; y < lines.length; ++y) {
        for (let x = 0; x < width; ++x) {
            const value = lines[y]! / shift ** x & shift - 1
            readFunction(x, y, value)
        }
    }
}
