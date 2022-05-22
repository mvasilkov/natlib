/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

type Proc = () => void

export function debounce(proc: Proc, wait: number): Proc {
    let triggering = false
    let before: number

    return function () {
        before = Date.now()

        if (triggering) return
        triggering = true

        setTimeout(function wrapped() {
            const effectiveSleep = Date.now() - before

            if (effectiveSleep < wait) {
                setTimeout(wrapped, wait - effectiveSleep)
            }
            else {
                triggering = false
                proc()
            }
        }, wait)
    }
}
