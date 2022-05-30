/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { getPCM } from './audio.js'

/** Callback function type */
type AudioCallback = (buf: AudioBuffer) => void

/** Impulse response class */
export class ImpulseResponse {
    audioContext: AudioContext

    constructor(audioContext: AudioContext) {
        this.audioContext = audioContext
    }
}

/** Apply a lowpass filter to the AudioBuffer. */
export function applyGradualLowpass(
    buf: AudioBuffer,
    startFrequency: number,
    endFrequency: number,
    end: number,
    done: AudioCallback,
) {
    const audioContext = new OfflineAudioContext(buf.numberOfChannels,
        buf.length, buf.sampleRate)

    const filter = new BiquadFilterNode(audioContext, {
        type: 'lowpass',
        Q: 0.0001,
        frequency: startFrequency,
    })
    filter.connect(audioContext.destination)
    filter.frequency.exponentialRampToValueAtTime(endFrequency, end)

    const player = new AudioBufferSourceNode(audioContext, {
        buffer: buf,
    })
    player.connect(filter)
    player.start()

    audioContext.oncomplete = event => {
        done(event.renderedBuffer)
    }
    audioContext.startRendering()
}
