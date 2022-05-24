/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Callback function type */
type LoopCallback = (t: number) => void

/** Main loop using a fixed step of `T` milliseconds.
 * `render()` receives `t` in the range (0, 1] for interpolation. */
export function startMainloop(update: LoopCallback, render: LoopCallback, T = 20) {
    let before: number
    let t = 0

    requestAnimationFrame(function (now: number) {
        requestAnimationFrame(loop)

        before = now
    })

    function loop(now: number) {
        requestAnimationFrame(loop)

        t += now - before
        before = now

        // Most updates per render
        let n = 4

        while (t > 0) {
            t -= T
            if (--n >= 0) update(T)
        }

        render(t / T + 1)
    }
}
