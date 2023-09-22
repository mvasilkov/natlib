/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { ShortBool, type ExtendedBool } from '../prelude.js'

/** Audio initialization function type */
export type AudioInitializationFunction = (con: AudioContext) => void

/** Audio handle class */
export class AudioHandle {
    con?: AudioContext
    initialized: ExtendedBool

    /** Initialize the audio context.
     * See https://html.spec.whatwg.org/multipage/interaction.html#activation-triggering-input-event */
    async initialize(ini?: AudioInitializationFunction) {
        if (this.initialized) return

        this.con ??= new AudioContext

        if (this.con.state !== 'running') {
            try {
                await this.con.resume()
            }
            catch (err) {
                return
            }
            // Multiple initialize() calls can eventually get here.
            if (this.initialized) return
        }

        ini?.(this.con) // Can't be async

        this.initialized = ShortBool.TRUE
    }
}
