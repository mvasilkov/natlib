/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { uint8_t } from '../prelude'
import type { PRNG32 } from '../prng/Mulberry32'
import { lerp, smootherstep } from '../interpolation.js'
import { shuffle } from '../prng/functions.js'

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

/** Build a random permutation table. */
export function buildPermutationTable(r: PRNG32): uint8_t[] {
    const a = Array.from({ length: 256 }, (_, n) => n)

    return shuffle(r, a).concat(a)
}

/** 3D noise interface */
export interface INoise3 {
    noise3(x: number, y: number, z: number): number
}

/** Perlin noise class */
export class PerlinNoise implements INoise3 {
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

        const A = this.p[X]! + Y
        const AA = this.p[A]! + Z
        const AB = this.p[A + 1]! + Z
        const B = this.p[X + 1]! + Y
        const BA = this.p[B]! + Z
        const BB = this.p[B + 1]! + Z

        return lerp(
            lerp(
                lerp(
                    grad(this.p[AA]!, x, y, z),
                    grad(this.p[BA]!, x - 1, y, z),
                    u),
                lerp(
                    grad(this.p[AB]!, x, y - 1, z),
                    grad(this.p[BB]!, x - 1, y - 1, z),
                    u),
                v),
            lerp(
                lerp(
                    grad(this.p[AA + 1]!, x, y, z - 1),
                    grad(this.p[BA + 1]!, x - 1, y, z - 1),
                    u),
                lerp(
                    grad(this.p[AB + 1]!, x, y - 1, z - 1),
                    grad(this.p[BB + 1]!, x - 1, y - 1, z - 1),
                    u),
                v),
            w)
    }
}
