/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Convert decibels to power ratio. */
export const convertDecibelsToPowerRatio = (decibels: number): number => 10 ** (0.1 * decibels)

/** Convert decibels to amplitude ratio. */
export const convertDecibelsToAmplitudeRatio = (decibels: number): number => 10 ** (0.05 * decibels)

/** Convert power ratio to decibels. */
export const convertPowerRatioToDecibels = (linear: number): number => 10 * Math.log10(linear)

/** Convert amplitude ratio to decibels. */
export const convertAmplitudeRatioToDecibels = (linear: number): number => 20 * Math.log10(linear)

/** Fast, less precise decibels to power ratio function. */
export const convertDecibelsToPowerRatioFast = (decibels: number): number => Math.exp(Math.LN10 * 0.1 * decibels)

/** Fast, less precise decibels to amplitude ratio function. */
export const convertDecibelsToAmplitudeRatioFast = (decibels: number): number => Math.exp(Math.LN10 * 0.05 * decibels)
