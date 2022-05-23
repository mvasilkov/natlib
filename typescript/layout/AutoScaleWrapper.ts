/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

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

    updateWrapper = () => {
        const viewportWidth = visualViewport.width
        const viewportHeight = visualViewport.height
        const viewportAspectRatio = viewportWidth / viewportHeight
        const wrapperAspectRatio = this.width / this.height

        let left = visualViewport.offsetLeft
        let top = visualViewport.offsetTop

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
        addEventListener('resize', this.updateWrapper)

        visualViewport.addEventListener('resize', this.updateWrapper)
        visualViewport.addEventListener('scroll', this.updateWrapper)

        this.updateWrapper()
    }
}
