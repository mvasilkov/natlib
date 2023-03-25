/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { UINT32_MAX } from '../prelude.js'
import { register4 } from '../runtime.js'
import type { IVec3, Vec3 } from '../Vec3'
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

/** Get a pseudorandom point on the unit sphere. */
export function uniformSampleSphere(prng: IPrng32): Vec3 {
    // Algorithm by George Marsaglia (1972)
    let u: number, v: number, n: number

    do {
        u = randomOpenUnit1Ball(prng)
        v = randomOpenUnit1Ball(prng)
        n = u ** 2 + v ** 2
    }
    while (n >= 1)

    const a = 2 * (1 - n) ** 0.5

    return register4.set(a * u, a * v, 1 - 2 * n)
}

/** Get a pseudorandom point on the unit hemisphere. */
export function uniformSampleHemisphere(prng: IPrng32, normal: Readonly<IVec3>): Vec3 {
    if (uniformSampleSphere(prng).dot(normal) < 0) {
        return register4.scale(-1)
    }
    return register4
}
