/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import type { PRNG32 } from './Mulberry32'
import { randomClosedUnitBall } from './functions.js'
import { Vec3 } from '../Vec3.js'

/** Get a point on the unit sphere. */
export function uniformSampleSphere(r: PRNG32, result: Vec3): Vec3 {
    // Algorithm by George Marsaglia (1972).
    let u: number, v: number, n: number

    do {
        u = randomClosedUnitBall(r)
        v = randomClosedUnitBall(r)
        n = u ** 2 + v ** 2
    }
    while (n >= 1)

    const a = 2 * (1 - n) ** 0.5

    result.set(a * u, a * v, 1 - 2 * n)

    return result
}

/** Get a point on the unit hemisphere. */
export function uniformSampleHemisphere(normal: Vec3, r: PRNG32, result: Vec3): Vec3 {
    if (uniformSampleSphere(r, result).dot(normal) < 0) {
        // If the point is in the wrong hemisphere, flip it.
        result.scale(-1)
    }
    return result
}
