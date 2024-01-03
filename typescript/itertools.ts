/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

import type { PositiveInteger } from './prelude'

/** Sliding window generator */
export function* slidingWindow<T, Value extends number = number>(array: readonly T[], size: PositiveInteger<Value>): Generator<T[], void> {
    for (let n = 0; n <= array.length - size; ++n) {
        yield array.slice(n, n + size)
    }
}

/** Permutations generator */
export function* permutations<T>(array: readonly T[]): Generator<T[], void> {
    if (array.length < 2) {
        yield array.slice()
        return
    }
    for (let n = 0; n < array.length; ++n) {
        const x = array[n]!
        for (const xs of permutations([...array.slice(0, n), ...array.slice(n + 1)])) {
            yield [x, ...xs]
        }
    }
}
