/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import type { IVec2 } from '../Vec2'
import { AutoScaleWrapper } from './AutoScaleWrapper.js'

/** Wrapper class that fills the viewport by scaling and rotating its contents. */
export class AutoRotateWrapper extends AutoScaleWrapper {
    rotate: -1 | 0 | 1

    constructor(wrapper: HTMLElement, width: number, height: number) {
        super(wrapper, width, height)

        this.rotate = 0
    }

    /** Update wrapper to fill the viewport. */
    override updateWrapper = () => {
        const viewportWidth = visualViewport!.width
        const viewportHeight = visualViewport!.height
        const viewportAspectRatio = viewportWidth / viewportHeight
        const wrapperAspectRatio = this.width / this.height

        let finalWidth = this.width
        let finalHeight = this.height

        if (wrapperAspectRatio < 1 !== viewportAspectRatio < 1) {
            finalWidth = this.height
            finalHeight = this.width

            if (wrapperAspectRatio < 1) {
                // Portrait screen to landscape viewport
                this.rotate = 1
            }
            else {
                // Landscape screen to portrait viewport
                this.rotate = -1
            }
        }
        else this.rotate = 0

        const finalAspectRatio = finalWidth / finalHeight

        let left = 0
        let top = 0

        if (finalAspectRatio < viewportAspectRatio) {
            // Fit height
            this.scale = viewportHeight / finalHeight
            left += 0.5 * (viewportWidth - this.scale * finalWidth)
        }
        else {
            // Fit width
            this.scale = viewportWidth / finalWidth
            top += 0.5 * (viewportHeight - this.scale * finalHeight)
        }

        if (this.rotate === 1) {
            left = viewportWidth - left
        }
        else if (this.rotate === -1) {
            top = viewportHeight - top
        }

        left += visualViewport!.offsetLeft
        top += visualViewport!.offsetTop

        this.wrapper.style.transform = `translate(${left}px, ${top}px) rotate(${this.rotate}00grad) scale(${this.scale})`
    }

    /** Translate a point from document coordinates to viewport coordinates. */
    override documentToViewport(point: IVec2) {
        point.x /= this.scale
        point.y /= this.scale

        let t: number
        if (this.rotate === 1) {
            t = point.x
            point.x = point.y
            point.y = this.height - t
        }
        else if (this.rotate === -1) {
            t = point.y
            point.y = point.x
            point.x = this.width - t
        }
    }
}
