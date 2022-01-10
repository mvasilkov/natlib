/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { uint8_t } from '../prelude'
import type { INoise3 } from './noise'
import { lerp, smootherstep } from '../interpolation.js'

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

        const a = this.p[x0]! + y0
        const aa = this.p[a]! + z0
        const ab = this.p[a + 1]! + z0
        const b = this.p[x0 + 1]! + y0
        const ba = this.p[b]! + z0
        const bb = this.p[b + 1]! + z0

        return lerp(
            lerp(
                lerp(
                    grad(this.p[aa]!, x, y, z),
                    grad(this.p[ba]!, x - 1, y, z),
                    u),
                lerp(
                    grad(this.p[ab]!, x, y - 1, z),
                    grad(this.p[bb]!, x - 1, y - 1, z),
                    u),
                v),
            lerp(
                lerp(
                    grad(this.p[aa + 1]!, x, y, z - 1),
                    grad(this.p[ba + 1]!, x - 1, y, z - 1),
                    u),
                lerp(
                    grad(this.p[ab + 1]!, x, y - 1, z - 1),
                    grad(this.p[bb + 1]!, x - 1, y - 1, z - 1),
                    u),
                v),
            w)
    }
}
