/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import type { uint32_t } from '../prelude'
import type { CanvasHandle } from '../canvas/CanvasHandle'
import { Mulberry32 } from '../prng/Mulberry32.js'
import { buildPermutationTable, PerlinNoise } from '../noise/PerlinNoise.js'

const classMapR = {
    Mulberry32,
}

type rn_t = keyof typeof classMapR

const classMapN = {
    PerlinNoise,
}

type nn_t = keyof typeof classMapN

export function paintNoise3(nn: nn_t, scale: number,
    rn: rn_t, seed: uint32_t, canvas: CanvasHandle) {

    const r = new classMapR[rn](seed)
    const p = buildPermutationTable(r)

    const n = new classMapN[nn](p)

    for (let y = 0; y < canvas.height; ++y) {
        for (let x = 0; x < canvas.width; ++x) {
            const b = 127.5 * (n.noise3(x / scale, y / scale, 0) + 1)

            canvas.con.fillStyle = `rgb(${b},${b},${b})`
            canvas.con.fillRect(x, y, 1, 1)
        }
    }
}
