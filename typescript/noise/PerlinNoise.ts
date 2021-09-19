/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="../natlib.d.ts" />

import type { PRNG32 } from '../prng/Mulberry32'

/** Perlin noise gradient function */
function grad(n: number, x: number, y: number, z: number): number {
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
function buildPermutationTable(r: PRNG32): Uint8Array {
}
