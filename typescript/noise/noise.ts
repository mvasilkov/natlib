/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { uint8_t } from '../prelude'
import { IPrng32, shuffle } from '../prng/prng.js'

/** 3D noise interface */
export interface INoise3 {
    noise3(x: number, y: number, z: number): number
}

/** Build a random permutation table. */
export function buildPermutationTable(prng: IPrng32): uint8_t[] {
    const a = Array.from({ length: 256 }, (_unused, n) => n)

    return shuffle(prng, a).concat(a)
}
