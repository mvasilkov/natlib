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

/** Permutations function */
export function* permutations<T>(array: T[]): Generator<T[], void> {
    if (array.length < 2) {
        yield array
        return
    }
    for (let n = 0; n < array.length; ++n) {
        const x = array[n]!
        for (const xs of permutations([...array.slice(0, n), ...array.slice(n + 1)])) {
            yield [x, ...xs]
        }
    }
}
