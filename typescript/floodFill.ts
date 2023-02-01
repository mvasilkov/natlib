/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { ExtendedBool, FALSE, TRUE } from './prelude.js'

const enum FillDirection { UP = 1, DOWN, BOTH }
// Required: FillDirection.BOTH === (FillDirection.UP | FillDirection.DOWN)

type Scanline = [x0: number, x1: number, y: number, direction: FillDirection]

/** Update predicate for flood fill */
export type ShouldUpdate = (x: number, y: number) => ExtendedBool

/** Update function for flood fill */
export type UpdateFunction = (x: number, y: number) => void

/** Scanline flood fill starting at `(x, y)` in a buffer `width` by `height`.
 * Update values using `updateFunction()` if `shouldUpdate()` returns `true`. */
export function floodFill(width: number, height: number, x: number, y: number, shouldUpdate: ShouldUpdate, updateFunction: UpdateFunction) {
    const stack: Scanline[] = [
        [x, x, y, FillDirection.BOTH],
    ]

    while (stack.length !== 0) {
        let [x0, x1, y, direction] = stack.pop()!

        // Expand the scanline to the left
        let u0 = x0
        while (u0 >= 0 && shouldUpdate(u0, y)) {
            --u0
        }
        if (++u0 < x0 - 1) {
            direction = FillDirection.BOTH
        }

        // Expand the scanline to the right
        let u1 = x1
        while (u1 < width && shouldUpdate(u1, y)) {
            ++u1
        }
        if (--u1 > x1 + 1) {
            direction = FillDirection.BOTH
        }

        // Fill the scanline. Reuse the x and x0 variables.
        let stripe = FALSE
        for (x = u0; x <= u1; ++x) {
            if (shouldUpdate(x, y)) {
                updateFunction(x, y)

                if (!stripe) {
                    stripe = TRUE
                    x0 = x
                }
            }
            else {
                if (stripe) {
                    stripe = FALSE
                    push(x0, x - 1, y, direction)
                }
            }
        }

        if (stripe) push(x0, u1, y, direction)
    }

    /** Push scanlines onto the stack. */
    function push(x0: number, x1: number, y: number, direction: FillDirection) {
        if ((direction & FillDirection.UP) && (y > 0)) {
            stack.push([x0, x1, y - 1, FillDirection.UP])
        }

        if ((direction & FillDirection.DOWN) && (y < height - 1)) {
            stack.push([x0, x1, y + 1, FillDirection.DOWN])
        }
    }
}
