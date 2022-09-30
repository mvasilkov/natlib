/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

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

//#region Easing functions

export type EasingFunction = (t: number) => number

export function easeOut(fn: EasingFunction): EasingFunction {
    return t => 1 - fn(1 - t)
}

export function easeInOut(fn: EasingFunction): EasingFunction {
    return t => t < 0.5 ? fn(2 * t) / 2 : 1 - fn(2 - 2 * t) / 2
}

//#endregion
