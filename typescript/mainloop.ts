/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Callback function type */
type LoopCallback = (t: number) => void

export function startMainloop(update: LoopCallback, render: LoopCallback, T = 0.02) {
    let before: number
    let t = 0

    requestAnimationFrame(init)

    function init(now: number) {
        requestAnimationFrame(loop)

        before = now
    }

    function loop(now: number) {
        requestAnimationFrame(loop)

        t += (now - before) * 0.001
        before = now

        let n = 2

        while (t > 0) {
            t -= T
            if (--n >= 0) update(T)
        }

        render(t / T + 1)
    }
}
