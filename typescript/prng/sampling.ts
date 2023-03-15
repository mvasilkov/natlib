/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { UINT32_MAX } from '../prelude.js'
import type { IPrng32 } from './prng'

/** Return a pseudorandom number in the range [-1, 1]. */
export function randomClosedUnit1Ball(prng: IPrng32): number {
    const n = prng.randomUint32() // Inline
    return (2 * n - UINT32_MAX) / UINT32_MAX
}

/** Return a pseudorandom number in the range (-1, 1). */
export function randomOpenUnit1Ball(prng: IPrng32): number {
    const n = prng.randomUint32() // Inline
    return (2 * n - UINT32_MAX) / (UINT32_MAX + 1)
}
