/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { uint32_t } from '../prelude'
import type { IPrng, IPrng32 } from './prng'

/** SplitMix32 PRNG class */
export class SplitMix32 implements IPrng32, IPrng {
    state: uint32_t

    constructor(seed: uint32_t) {
        this.state = seed | 0
    }

    /** Return a pseudorandom uint32. */
    randomUint32(): uint32_t {
        let z: uint32_t = this.state = (this.state + 0x9e3779b9) | 0
        z = Math.imul(z ^ (z >>> 16), 0x85ebca6b)
        z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35)
        return (z ^ (z >>> 16)) >>> 0
    }

    /** Return a pseudorandom number in the range [0, 1). */
    random(): number {
        return this.randomUint32() / (2 ** 32)
    }
}
