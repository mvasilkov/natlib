/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Get the PCM data associated with the AudioBuffer. */
export function getPCM(buf: AudioBuffer): Float32Array[] {
    const channels = []
    for (let n = 0; n < buf.numberOfChannels; ++n) {
        channels[n] = buf.getChannelData(n)
    }
    return channels
}
