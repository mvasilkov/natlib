/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

/** Function of this type is invoked by decodeBitmap for each pixel. */
export type ReadFunction = (x: number, y: number, value: number) => void

/** Decode a bitmap stored as an array of integers. */
export const decodeBitmap = (lines: number[], width: number, bpp: number, readFunction: ReadFunction): void => {
    const shift = 1 << bpp
    for (let y = 0; y < lines.length; ++y) {
        for (let x = 0; x < width; ++x) {
            const value = lines[y]! / shift ** x & shift - 1
            readFunction(x, y, value)
        }
    }
}

/** Decode a bitmap stored as a BigInt value. */
export const decodeBitmapBigInt = (value: bigint, width: number, height: number, cardinality: number | bigint, readFunction: ReadFunction): void => {
    cardinality = BigInt(cardinality)
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            readFunction(x, y, Number(value % cardinality))
            value /= cardinality
        }
    }
}
