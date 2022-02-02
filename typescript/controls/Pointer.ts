/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { CanvasHandle } from '../canvas/CanvasHandle'
import type { IVec2 } from '../Vec2'

/** Pointer controls class */
export class Pointer implements IVec2 {
    x: number
    y: number
    held: boolean

    readonly ch: CanvasHandle

    constructor(ch: CanvasHandle) {
        this.x = this.y = 0
        this.held = false

        this.ch = ch
    }

    /** Set the pointer position relative to the canvas. */
    setPosition(event: MouseEvent | Touch) {
        const r = this.ch.canvas.getBoundingClientRect()

        this.x = event.clientX - r.left
        this.y = event.clientY - r.top
    }

    /** Initialize the event handlers. */
    addEventListeners(target: HTMLElement) {
        // Mouse events
        target.addEventListener('mousedown', event => {
            event.preventDefault()

            this.held = true
            this.setPosition(event)
        })

        target.addEventListener('mousemove', event => {
            event.preventDefault()

            this.setPosition(event)
        })

        target.addEventListener('mouseup', event => {
            event.preventDefault()

            this.held = false
        })

        target.addEventListener('mouseleave', _event => {
            // Default action is None, so no event.preventDefault()

            this.held = false
        })

        // Touch events
        target.addEventListener('touchstart', event => {
            event.preventDefault()

            this.held = true
            this.setPosition(event.targetTouches[0]!)
        })

        target.addEventListener('touchmove', event => {
            event.preventDefault()

            this.setPosition(event.targetTouches[0]!)
        })

        target.addEventListener('touchend', event => {
            event.preventDefault()

            this.held = false
        })

        target.addEventListener('touchcancel', _event => {
            // Default action is None, so no event.preventDefault()

            this.held = false
        })
    }
}
