/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { ShortBool, type ExtendedBool } from '../prelude.js'

/** Debounced function type */
export type DebouncedFunction<T extends unknown[]> = (...a: T) => void

/** Create a debounced function that delays the given function
 * by a given `wait` time in milliseconds. If the function is
 * called again before the timeout expires, the previous call
 * will be aborted. */
export function debounce<T extends unknown[]>(defun: DebouncedFunction<T>, wait: number): DebouncedFunction<T> {
    let pending: ExtendedBool
    let lastCalled: number

    return function (...a: T) {
        lastCalled = Date.now()

        if (pending) return
        pending = ShortBool.TRUE

        setTimeout(function wrapped() {
            const pauseDuration = Date.now() - lastCalled

            if (pauseDuration < wait) {
                setTimeout(wrapped, wait - pauseDuration)
            }
            else {
                pending = ShortBool.FALSE
                defun(...a)
            }
        }, wait)
    }
}
