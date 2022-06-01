/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { IPrng32, randomClosedUnitBall } from '../prng/prng.js'
import { getPCM } from './audio.js'
import { convertDecibelsToPowerRatio } from './decibels.js'

/** Callback function type */
type AudioCallback = (buf: AudioBuffer) => void

/** Impulse response class */
export class ImpulseResponse {
    audioContext: AudioContext
    prng: IPrng32

    constructor(audioContext: AudioContext, prng: IPrng32) {
        this.audioContext = audioContext
        this.prng = prng
    }

    /** Get a reverb impulse response. */
    generateReverb(
        done: AudioCallback,
        startFrequency: number,
        endFrequency: number,
        duration: number,
        fadeIn = 0,
        decayThreshold = -60,
        channels = 2,
    ) {
        const sampleRate = this.audioContext.sampleRate

        const length = Math.round(duration * sampleRate)
        const fadeInLength = Math.round(fadeIn * sampleRate)

        const decay = convertDecibelsToPowerRatio(decayThreshold) ** (1 / (length - 1))
        const fade = 1 / (fadeInLength - 1)

        const buf = this.audioContext.createBuffer(channels, length, sampleRate)

        for (const ch of getPCM(buf)) {
            for (let n = 0; n < length; ++n) {
                ch[n] = randomClosedUnitBall(this.prng) * decay ** n
            }
            for (let n = 0; n < fadeInLength; ++n) {
                ch[n] *= fade * n
            }
        }

        applyGradualLowpass(done, buf, startFrequency, endFrequency, duration)
    }
}

/** Apply a lowpass filter to the AudioBuffer. */
export function applyGradualLowpass(
    done: AudioCallback,
    buf: AudioBuffer,
    startFrequency: number,
    endFrequency: number,
    duration: number,
) {
    const audioContext = new OfflineAudioContext(buf.numberOfChannels,
        buf.length, buf.sampleRate)

    const filter = new BiquadFilterNode(audioContext, {
        type: 'lowpass',
        Q: 0.0001,
        frequency: startFrequency,
    })
    filter.connect(audioContext.destination)
    filter.frequency.exponentialRampToValueAtTime(endFrequency, duration)

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
