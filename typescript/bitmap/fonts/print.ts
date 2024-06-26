/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { decodeBitmapBigInt, type ReadFunction } from '../bitmap.js'

/** Print the given text in a fixed-width bitmap font. */
export const print = (text: string, font: bigint, width: number, height: number, cardinality: number | bigint, startCodePoint: number, readFunction: ReadFunction, letterSpacing = 1): void => {
    cardinality = BigInt(cardinality) // .InlineExp
    const stride = cardinality ** BigInt(width * height)

    for (let caret = 0, n = 0; n < text.length; ++n) {
        const skip = text.charCodeAt(n) - startCodePoint
        if (skip >= 0) {
            const glyph = font / stride ** BigInt(skip) // .Inline
            decodeBitmapBigInt(glyph, width, height, cardinality, (x, y, value) => readFunction(caret + x, y, value))
        }
        caret += width + letterSpacing
    }
}

/** Print the given text in a fixed-width bitmap font (1-bit color depth). */
export const print1bpp = (text: string, font: bigint, width: number, height: number, startCodePoint: number, readFunction: ReadFunction, letterSpacing = 1): void => {
    for (let caret = 0, n = 0; n < text.length; ++n) {
        const skip = text.charCodeAt(n) - startCodePoint
        if (skip >= 0) {
            const glyph = font >> BigInt(skip * width * height) // .Inline
            decodeBitmapBigInt(glyph, width, height, 2n, (x, y, value) => readFunction(caret + x, y, value))
        }
        caret += width + letterSpacing
    }
}
