/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import { ShortBool, type ExtendedBool } from '../prelude.js'

/** Debounced function type */
export type DebouncedFunction<T extends unknown[]> = (...a: T) => void

/** Create a function that delays the execution of the given function
 * by the specified interval in milliseconds. If the function is called
 * again before the interval ends, the previous call is canceled. */
export const debounce = <T extends unknown[]>(defun: DebouncedFunction<T>, delay: number): DebouncedFunction<T> => {
    let pending: ExtendedBool
    let lastCalled: number

    return (...a: T) => {
        lastCalled = Date.now()

        if (pending) return
        pending = ShortBool.TRUE

        const fn = () => {
            const pauseDuration = Date.now() - lastCalled

            if (pauseDuration < delay) {
                setTimeout(fn, delay - pauseDuration)
            }
            else {
                pending = ShortBool.FALSE
                defun(...a)
            }
        }
        setTimeout(fn, delay)
    }
}
