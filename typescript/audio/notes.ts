/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Convert MIDI note to frequency. */
export function convertMidiToFrequency(n: number): number {
    return 440 * 2 ** ((n - 69) / 12)
}

/** Convert frequency to MIDI note. */
export function convertFrequencyToMidi(n: number): number {
    return 12 * Math.log2(n / 440) + 69
}
