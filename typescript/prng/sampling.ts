/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import type { PRNG32 } from './Mulberry32'
import { randomClosedUnitBall } from './functions.js'
import { Vec3 } from '../Vec3.js'

export function uniformSampleSphere(r: PRNG32, result: Vec3) {
    let u: number, v: number, n: number

    do {
        u = randomClosedUnitBall(r)
        v = randomClosedUnitBall(r)
        n = u ** 2 + v ** 2
    }
    while (n >= 1)

    const a = 2 * (1 - n) ** 0.5

    result.set(a * u, a * v, 1 - 2 * n)
}

export function uniformSampleHemisphere(r: PRNG32, result: Vec3) {
}
