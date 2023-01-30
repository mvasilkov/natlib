/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Sliding window function */
export function* slidingWindow<T>(array: T[], size: number) {
    for (let n = 0; n <= array.length - size; ++n) {
        yield array.slice(n, n + size)
    }
}
