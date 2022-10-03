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

/** Easing function type */
export type EasingFunction = (t: number) => number

/** Convert an ease-in (accelerate) function to an ease-out
 * (decelerate) function. */
export function easeOut(fn: EasingFunction): EasingFunction {
    return t => 1 - fn(1 - t)
}

/** Convert an ease-in (accelerate) function to an ease-in-out
 * (accelerate then decelerate) function. */
export function easeInOut(fn: EasingFunction): EasingFunction {
    return t => t < 0.5 ? fn(2 * t) / 2 : 1 - fn(2 - 2 * t) / 2
}

/** Position equals the square of `t`. */
export function easeInQuad(t: number): number {
    return t * t
}

export function easeOutQuad(t: number): number {
    return t * (2 - t)
}

export function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 2 * t * (2 - t) - 1
}

/** Position equals the cube of `t`. */
export function easeInCubic(t: number): number {
    return t * t * t
}

export function easeOutCubic(t: number): number {
    return (t - 1) ** 3 + 1
}

export function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 4 * (t - 1) ** 3 + 1
}

//#endregion
