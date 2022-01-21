/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { lerp, smootherstep } from '../interpolation.js'
import type { uint8_t } from '../prelude'
import type { INoise3 } from './noise'

/** Perlin noise gradient function */
function grad(n: uint8_t, x: number, y: number, z: number): number {
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
    // Unreachable code
    return 0
    // End unreachable code
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
        let x0 = Math.floor(x)
        let y0 = Math.floor(y)
        let z0 = Math.floor(z)

        x -= x0
        y -= y0
        z -= z0

        x0 &= 255
        y0 &= 255
        z0 &= 255

        const u = smootherstep(x)
        const v = smootherstep(y)
        const w = smootherstep(z)

        const p = this.p

        const a = p[x0]! + y0
        const aa = p[a]! + z0
        const ab = p[a + 1]! + z0
        const b = p[x0 + 1]! + y0
        const ba = p[b]! + z0
        const bb = p[b + 1]! + z0

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
