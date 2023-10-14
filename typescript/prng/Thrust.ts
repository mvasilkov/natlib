/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { UINT64_MAX, type uint64_t } from '../prelude.js'
import type { IPrng64 } from './prng'

/** Thrust PRNG class */
export class Thrust implements IPrng64 {
    state: uint64_t

    constructor(seed: uint64_t) {
        this.state = seed | 1n
    }

    /** Return a pseudorandom uint64. */
    randomUint64(): uint64_t {
        const s = this.state
        this.state = (this.state + 0x6A5D39EAE12657AAn) & UINT64_MAX
        const z = ((s ^ (s >> 25n)) * this.state) & UINT64_MAX
        return z ^ (z >> 22n)
    }
}
