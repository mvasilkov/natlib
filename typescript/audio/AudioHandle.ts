/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { ExtendedBool, ShortBool } from '../prelude.js'

/** Audio initialization function type */
export type AudioInitializationFunction = (con: AudioContext) => void

/** Audio handle class */
export class AudioHandle {
    con?: AudioContext
    initialized: ExtendedBool

    /** Initialize the audio context */
    async initialize(ini?: AudioInitializationFunction) {
        if (this.initialized) return

        this.con ??= new AudioContext

        if (this.con.state === 'suspended') {
            try {
                await this.con.resume()
            }
            catch (err) {
                return
            }
            // Multiple initialize() calls can eventually get here.
            if (this.initialized) return
        }

        if (this.con.state === 'suspended') return

        ini?.(this.con) // Can't be async

        this.initialized = ShortBool.TRUE
    }
}
