/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Get the PCM data associated with the AudioBuffer. */
export function getPCM(buf: AudioBuffer): Float32Array[] {
    const channels: Float32Array[] = []
    for (let n = 0; n < buf.numberOfChannels; ++n) {
        channels[n] = buf.getChannelData(n)
    }
    return channels
}

/** Convert MIDI note to frequency. */
export function convertMidiToFrequency(n: number): number {
    return 440 * 2 ** ((n - 69) / 12)
}

/** Convert frequency to MIDI note. */
export function convertFrequencyToMidi(n: number): number {
    return 12 * Math.log2(n / 440) + 69
}
