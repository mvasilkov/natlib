/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import type { uint32_t } from '../prelude'
import type { CanvasHandle } from '../canvas/CanvasHandle'
import { Mulberry32 } from '../prng/Mulberry32.js'
import { buildPermutationTable, PerlinNoise } from '../noise/PerlinNoise.js'

const prngClassMap = {
    Mulberry32,
}

type PrngId = keyof typeof prngClassMap

const noiseClassMap = {
    PerlinNoise,
}

type NoiseId = keyof typeof noiseClassMap

export function visualizeNoise3(noiseId: NoiseId, scale: number,
    prngId: PrngId, seed: uint32_t, canvas: CanvasHandle) {

    const r = new prngClassMap[prngId](seed)
    const p = buildPermutationTable(r)

    const n = new noiseClassMap[noiseId](p)

    for (let y = 0; y < canvas.height; ++y) {
        for (let x = 0; x < canvas.width; ++x) {
            const b = 127.5 * (n.noise3(x / scale, y / scale, 0) + 1)

            canvas.con.fillStyle = `rgb(${b},${b},${b})`
            canvas.con.fillRect(x, y, 1, 1)
        }
    }
}
