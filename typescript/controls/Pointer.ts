/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { ShortBool, type ExtendedBool } from '../prelude.js'
import type { IVec2 } from '../Vec2'

/** Pointer controls class */
export class Pointer implements IVec2 {
    x: number
    y: number
    held: ExtendedBool

    readonly plane: Element

    constructor(plane: Element) {
        this.x = this.y = 0

        this.plane = plane
    }

    /** Set the pointer position relative to the plane. */
    setPosition(event: MouseEvent | Touch): void {
        const r = this.plane.getBoundingClientRect()

        this.x = event.clientX - r.left
        this.y = event.clientY - r.top

        focus()
    }

    /** Initialize the event handlers. */
    addEventListeners(target: GlobalEventHandlers): void {
        // Mouse events
        target.addEventListener('mousedown', event => {
            event.preventDefault()

            this.held = ShortBool.TRUE
            this.setPosition(event)
        })

        target.addEventListener('mousemove', event => {
            event.preventDefault()

            this.setPosition(event)
        })

        target.addEventListener('mouseup', event => {
            event.preventDefault()

            this.held = ShortBool.FALSE
        })

        target.addEventListener('mouseleave', _event => {
            // Default action is none, so no event.preventDefault()

            this.held = ShortBool.FALSE
        })

        // Touch events
        target.addEventListener('touchstart', event => {
            event.preventDefault()

            this.held = ShortBool.TRUE
            this.setPosition(event.targetTouches[0]!)
        })

        target.addEventListener('touchmove', event => {
            event.preventDefault()

            this.setPosition(event.targetTouches[0]!)
        })

        target.addEventListener('touchend', event => {
            event.preventDefault()

            this.held = ShortBool.FALSE
        })

        target.addEventListener('touchcancel', _event => {
            // Default action is none, so no event.preventDefault()

            this.held = ShortBool.FALSE
        })
    }
}
