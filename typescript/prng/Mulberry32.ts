/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="../natlib.d.ts" />

type uint32_t = number

/** Mulberry32 PRNG */
export class Mulberry32 {
    state: uint32_t

    constructor(seed: uint32_t) {
        this.state = seed | 0
    }

    /** Return a pseudorandom uint32. */
    randomUint32(): uint32_t {
        let z: uint32_t = this.state = (this.state + 0x6D2B79F5) | 0
        z = Math.imul(z ^ (z >>> 15), z | 1)
        z ^= z + Math.imul(z ^ (z >>> 7), z | 61)
        return (z ^ (z >>> 14)) >>> 0
    }

    /** Return a pseudorandom number in the range [0, 1). */
    random(): number {
        return this.randomUint32() / (2 ** 32)
    }
}
