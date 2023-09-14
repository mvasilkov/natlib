/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number): number => a * (1 - t) + b * t

/** Hermite interpolation (3rd order) */
export const smoothstep = (t: number): number => t ** 2 * (3 - 2 * t)

/** Hermite interpolation (5th order) */
export const smootherstep = (t: number): number => t ** 3 * (t * (6 * t - 15) + 10)

//#region Easing functions

/** Easing function type */
export type EasingFunction = (t: number) => number

/** Convert an ease-in (accelerate) function to an ease-out
 * (decelerate) function. */
export const easeOut = (fn: EasingFunction): EasingFunction => t => 1 - fn(1 - t)

/** Convert an ease-in (accelerate) function to an ease-in-out
 * (accelerate then decelerate) function. */
export const easeInOut = (fn: EasingFunction): EasingFunction => t => t < 0.5 ? 0.5 * fn(2 * t) : 1 - 0.5 * fn(2 - 2 * t)

/** Quadratic ease-in function, position equals `t ** 2` */
export const easeInQuad = (t: number): number => t * t

/** Quadratic ease-out function */
export const easeOutQuad = (t: number): number => t * (2 - t)

/** Quadratic ease-in-out function */
export const easeInOutQuad = (t: number): number => t < 0.5 ? 2 * t * t : 2 * t * (2 - t) - 1

/** Cubic ease-in function, position equals `t ** 3` */
export const easeInCubic = (t: number): number => t ** 3

/** Cubic ease-out function */
export const easeOutCubic = (t: number): number => (t - 1) ** 3 + 1

/** Cubic ease-in-out function */
export const easeInOutCubic = (t: number): number => t < 0.5 ? 4 * t ** 3 : 4 * (t - 1) ** 3 + 1

/** Sinusoidal ease-in function */
export const easeInSine = (t: number): number => 1 - Math.cos(0.5 * Math.PI * t)

/** Sinusoidal ease-out function */
export const easeOutSine = (t: number): number => Math.sin(0.5 * Math.PI * t)

/** Sinusoidal ease-in-out function */
export const easeInOutSine = (t: number): number => 0.5 * (1 - Math.cos(Math.PI * t))

//#endregion
