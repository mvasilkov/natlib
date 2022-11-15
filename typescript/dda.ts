/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { register0 } from './runtime.js'
import type { IVec2, Vec2 } from './Vec2'

/** DDA tile intersection type */
export type DdaIntersection = Vec2 & {
    /** View plane distance */
    hitDistance?: number,
    /** Intersection is on a vertical side of a tile. */
    hitVertical?: boolean,
}

const result: DdaIntersection = register0

/** Return true to end the DDA loop. */
export type DdaCallback = (x: number, y: number, hitDistance: number) => boolean | void

/** Digital differential analyzer (DDA) */
export function dda(start: Readonly<IVec2>, direction: Readonly<IVec2>, done: DdaCallback): DdaIntersection {
    // Scaling factor
    const Δx = Math.abs(1 / direction.x)
    const Δy = Math.abs(1 / direction.y)

    // Current tile
    let xtile = Math.floor(start.x)
    let ytile = Math.floor(start.y)

    // Ray length
    let xlength: number, ylength: number

    // Ray direction (coarse)
    let xdir: 1 | -1, ydir: 1 | -1

    if (direction.x < 0) {
        xlength = (start.x - xtile) * Δx
        xdir = -1
    }
    else {
        xlength = (xtile + 1 - start.x) * Δx
        xdir = 1
    }

    if (direction.y < 0) {
        ylength = (start.y - ytile) * Δy
        ydir = -1
    }
    else {
        ylength = (ytile + 1 - start.y) * Δy
        ydir = 1
    }

    while (true) {
        // Extend the shorter ray
        if (result.hitVertical = xlength < ylength) {
            result.hitDistance = xlength
            xlength += Δx
            xtile += xdir
        }
        else {
            result.hitDistance = ylength
            ylength += Δy
            ytile += ydir
        }

        if (done(xtile, ytile, result.hitDistance)) {
            return result.setMultiplyScalar(direction, result.hitDistance).add(start)
        }
    }
}
