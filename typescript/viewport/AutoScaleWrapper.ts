/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import type { IVec2 } from '../Vec2'

/** Wrapper class that fills the viewport by scaling its contents. */
export class AutoScaleWrapper {
    readonly wrapper: HTMLElement
    readonly width: number
    readonly height: number
    scale: number

    constructor(wrapper: HTMLElement, width: number, height: number) {
        this.wrapper = wrapper
        this.width = width
        this.height = height
        this.scale = 1
    }

    /** Update wrapper to fill the viewport. */
    updateWrapper = () => {
        const viewportWidth = visualViewport!.width
        const viewportHeight = visualViewport!.height
        const viewportAspectRatio = viewportWidth / viewportHeight
        const wrapperAspectRatio = this.width / this.height

        let left = visualViewport!.offsetLeft
        let top = visualViewport!.offsetTop

        if (wrapperAspectRatio < viewportAspectRatio) {
            // Fit height
            this.scale = viewportHeight / this.height
            left += 0.5 * (viewportWidth - this.scale * this.width)
        }
        else {
            // Fit width
            this.scale = viewportWidth / this.width
            top += 0.5 * (viewportHeight - this.scale * this.height)
        }

        this.wrapper.style.transform = `translate(${left}px, ${top}px) scale(${this.scale})`
    }

    /** Initialize the event handlers. */
    addEventListeners() {
        // Sadly, visualViewport is nullable:
        // > If the associated document is fully active, return the VisualViewport object
        // > associated with the window. Otherwise, return null.
        // > https://wicg.github.io/visual-viewport/#dom-window-visualviewport
        // The workaround is to retry after a short delay.
        if (!visualViewport) {
            setTimeout(() => this.addEventListeners(), 999)
            return
        }

        addEventListener('resize', this.updateWrapper)

        visualViewport.addEventListener('resize', this.updateWrapper)
        visualViewport.addEventListener('scroll', this.updateWrapper)

        this.updateWrapper()
    }

    /** Translate a point from document coordinates to viewport coordinates. */
    documentToViewport(point: IVec2) {
        point.x /= this.scale
        point.y /= this.scale
    }
}
