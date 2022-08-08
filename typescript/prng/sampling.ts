/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { UINT32_MAX } from '../prelude.js'
import type { IPrng32 } from './prng'

/** Return a pseudorandom number in the range [-1, 1]. */
export function randomClosedUnit1Ball(prng: IPrng32): number {
    const a = prng.randomUint32()
    return (2 * a - UINT32_MAX) / UINT32_MAX
}
