/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="../natlib.d.ts" />

import type { uint32_t, PRNG32 } from './Mulberry32'

const UINT32_MAX = 2 ** 32 - 1

/** Return a pseudorandom uint32 in the range [0, n). */
export function randomUint32LessThan(r: PRNG32, n: uint32_t): uint32_t {
    const discard = UINT32_MAX - (UINT32_MAX % n)

    while (true) {
        const a = r.randomUint32()
        if (a < discard) return a % n
    }
}
