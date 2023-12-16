/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { lerp, smootherstep } from '../interpolation.js'
import type { uint8_t } from '../prelude'
import type { INoise3 } from './noise'

/** Perlin noise gradient function */
const grad = (n: uint8_t, x: number, y: number, z: number): number => {
    switch (n & 15) {
        case 0: return x + y
        case 2: return x - y
        case 4: return x + z
        case 6: return x - z
        case 8: return y + z
        case 10: return y - z
        case 12: return y + x
        case 14: return y - x

        case 1: return -x + y
        case 3: return -x - y
        case 5: return -x + z
        case 7: return -x - z
        case 9: return -y + z
        case 11: return -y - z
        case 13: return -y + z
        case 15: return -y - z
    }
    // .DeadCode
    return 0
    // .End(DeadCode)
}

/** Perlin noise class */
export class PerlinNoise implements INoise3 {
    /** Permutation table */
    readonly p: readonly uint8_t[]

    constructor(p: readonly uint8_t[]) {
        this.p = p
    }

    /** 3D Perlin noise */
    noise3(x: number, y: number, z: number): number {
        let X = Math.floor(x)
        let Y = Math.floor(y)
        let Z = Math.floor(z)

        x -= X
        y -= Y
        z -= Z

        X &= 255
        Y &= 255
        Z &= 255

        const u = smootherstep(x)
        const v = smootherstep(y)
        const w = smootherstep(z)

        const p = this.p

        const a = p[X]! + Y
        const aa = p[a]! + Z
        const ab = p[a + 1]! + Z
        const b = p[X + 1]! + Y
        const ba = p[b]! + Z
        const bb = p[b + 1]! + Z

        return lerp(
            lerp(
                lerp(
                    grad(p[aa]!, x, y, z),
                    grad(p[ba]!, x - 1, y, z),
                    u),
                lerp(
                    grad(p[ab]!, x, y - 1, z),
                    grad(p[bb]!, x - 1, y - 1, z),
                    u),
                v),
            lerp(
                lerp(
                    grad(p[aa + 1]!, x, y, z - 1),
                    grad(p[ba + 1]!, x - 1, y, z - 1),
                    u),
                lerp(
                    grad(p[ab + 1]!, x, y - 1, z - 1),
                    grad(p[bb + 1]!, x - 1, y - 1, z - 1),
                    u),
                v),
            w)
    }
}
