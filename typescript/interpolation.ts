/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t
}

/** Hermite interpolation (3rd order) */
export function smoothstep(t: number): number {
    return t ** 2 * (3 - 2 * t)
}

/** Hermite interpolation (5th order) */
export function smootherstep(t: number): number {
    return t ** 3 * (t * (6 * t - 15) + 10)
}
