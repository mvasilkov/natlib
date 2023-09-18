/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Callback function type */
export type LoopCallback = (t: number) => void

/** Main loop using a fixed step of `T` milliseconds.
 * `render()` receives `t` in the range (0, 1] for interpolation. */
export const startMainloop = (update: LoopCallback, render: LoopCallback, T = 20) => {
    let before: DOMHighResTimeStamp
    let t = 0

    const loop: FrameRequestCallback = current => {
        requestAnimationFrame(loop)

        t += current - before
        before = current

        // Most updates per render
        let n = 4

        while (t > 0) {
            t -= T
            if (--n >= 0) update(T)
        }

        render(t / T + 1)
    }

    requestAnimationFrame(current => {
        requestAnimationFrame(loop)

        before = current
    })
}
