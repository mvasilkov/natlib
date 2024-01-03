/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { UINT32_MAX, type uint32_t, type uint64_t } from '../prelude.js'

/** PRNG (floating point) interface */
export interface IPrng {
    random(): number
}

/** PRNG (32-bit integer) interface */
export interface IPrng32 {
    randomUint32(): uint32_t
}

/** PRNG (64-bit integer) interface */
export interface IPrng64 {
    randomUint64(): uint64_t
}

/** Return a pseudorandom uint32 in the range [0, n). */
export const randomUint32LessThan = (prng: IPrng32, n: uint32_t): uint32_t => {
    const discard = UINT32_MAX - (UINT32_MAX % n)

    while (true) {
        const a = prng.randomUint32()
        if (a < discard) return a % n
    }
}

/** Fisher–Yates shuffle, aka Knuth shuffle. */
export const shuffle = <T>(prng: IPrng32, array: T[]): T[] => {
    let n = array.length

    while (n) {
        const a = randomUint32LessThan(prng, n)
        --n

        const t = array[n]!
        array[n] = array[a]!
        array[a] = t
    }

    return array
}
