/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Debounced function type */
export type DebouncedFunction<T extends unknown[]> = (...args: T) => void

/** Create a debounced function that delays the given function
 * by a given `wait` time in milliseconds. If the function is
 * called again before the timeout expires, the previous call
 * will be aborted. */
export function debounce<T extends any[]>(defun: DebouncedFunction<T>, wait: number): DebouncedFunction<T> {
    let pending = false
    let lastCalled: number

    return function (...args: T) {
        lastCalled = Date.now()

        if (pending) return
        pending = true

        setTimeout(function wrapped() {
            const pauseDuration = Date.now() - lastCalled

            if (pauseDuration < wait) {
                setTimeout(wrapped, wait - pauseDuration)
            }
            else {
                pending = false
                defun(...args)
            }
        }, wait)
    }
}
