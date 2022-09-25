/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Vec2 } from './Vec2.js'

/** DDA tile intersection type */
export type DdaIntersection = Vec2 & {
    /** View plane distance */
    hitDistance?: number,
    /** Intersection is on a vertical side of a tile. */
    hitVertical?: boolean,
}

/** Return true to end the DDA loop. */
export type DdaCallback = (x: number, y: number, hitDistance: number) => boolean | void
