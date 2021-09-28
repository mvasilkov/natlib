/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import type { uint32_t } from '../stdint.h'
import type { PRNG32 } from './Mulberry32'

const UINT32_MAX = 2 ** 32 - 1

/** Return a pseudorandom uint32 in the range [0, n). */
export function randomUint32LessThan(r: PRNG32, n: uint32_t): uint32_t {
    const discard = UINT32_MAX - (UINT32_MAX % n)

    while (true) {
        const a = r.randomUint32()
        if (a < discard) return a % n
    }
}

/** Fisher–Yates shuffle, aka Knuth shuffle. */
export function shuffle<T>(r: PRNG32, array: T[]): T[] {
    let n = array.length

    while (n) {
        const a = randomUint32LessThan(r, n)
        --n

        const t = array[n]!
        array[n] = array[a]!
        array[a] = t
    }

    return array
}
