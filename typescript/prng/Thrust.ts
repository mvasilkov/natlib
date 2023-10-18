/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import type { uint64_t } from '../prelude'
import type { IPrng64 } from './prng'

/** Thrust PRNG class */
export class Thrust implements IPrng64 {
    /*@__MANGLE_PROP__*/
    state: uint64_t

    constructor(seed: uint64_t) {
        this.state = seed | 1n
    }

    /** Return a pseudorandom uint64. */
    randomUint64(): uint64_t {
        const s = this.state
        this.state = BigInt.asUintN(64, this.state + 0x6A5D39EAE12657AAn) // .InlineExp
        const z = BigInt.asUintN(64, (s ^ (s >> 25n)) * this.state)
        return z ^ (z >> 22n)
    }
}
