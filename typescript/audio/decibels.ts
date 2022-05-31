/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Convert decibels to power ratio. */
export function convertDecibelsToPowerRatio(decibels: number) {
    return 10 ** (decibels / 10)
}

/** Convert decibels to amplitude ratio. */
export function convertDecibelsToAmplitudeRatio(decibels: number) {
    return 10 ** (decibels / 20)
}

/** Convert power ratio to decibels. */
export function convertPowerRatioToDecibels(linear: number) {
    return 10 * Math.log10(linear)
}

/** Convert amplitude ratio to decibels. */
export function convertAmplitudeRatioToDecibels(linear: number) {
    return 20 * Math.log10(linear)
}

/** Fast decibels to power ratio. */
export function convertDecibelsToPowerRatioFast(decibels: number) {
    return Math.exp(Math.LN10 / 10 * decibels)
}

/** Fast decibels to amplitude ratio. */
export function convertDecibelsToAmplitudeRatioFast(decibels: number) {
    return Math.exp(Math.LN10 / 20 * decibels)
}
