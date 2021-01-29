/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

/** Linear interpolation */
function lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t
}
