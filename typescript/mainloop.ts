/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Callback function type */
type LoopCallback = (t: number) => void

/** Main loop using a fixed step of `T` milliseconds. */
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

        let n = 2

        while (t > 0) {
            t -= T
            if (--n >= 0) update(T)
        }

        render(t / T + 1)
    }
}
