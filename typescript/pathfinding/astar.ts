/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { PriorityQueue } from '../collections/PriorityQueue.js'
import type { ExtendedBool } from '../prelude'
import { Vec2 } from '../Vec2.js'

/** 2D location class internal to astar */
class Location extends Vec2 {
    // Can't change x and y without invalidating the key
    declare readonly x: number
    declare readonly y: number

    readonly key: number
    priority: number

    constructor(x: number, y: number) {
        super(x, y)

        this.key = this.y << 16 | this.x
        this.priority = 0
    }

    /** Manhattan distance on a square grid */
    distanceManhattan(other: Readonly<Location>): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y)
    }
}

/** This is a tuple to avoid constructing short-lived `Vec2` objects. */
export type Coordinates = ConstructorParameters<typeof Location>

/** Return an iterable of adjacent coordinates. */
export type GetAdjacent = (x: number, y: number) => Iterable<Coordinates>

/** Return true to end the `A*` loop. */
export type WalkFunction = (x: number, y: number) => void | ExtendedBool

/** `A*` path finding on a square grid */
export function astar(x0: number, y0: number, x1: number, y1: number, getAdjacent: GetAdjacent, done: WalkFunction) {
    const start = new Location(x0, y0)
    let end = new Location(x1, y1)

    const frontier = new PriorityQueue<Location>(
        (a, b) => a.priority - b.priority, // Sort ascending
        [start],
    )

    const previous: { [n: number]: Location } = {} // Object.create(null)
    const score: { [n: number]: number } = { [start.key]: 0 }

    while (frontier.length !== 0) {
        const current = frontier.get()!

        if (current.key === end.key) break // Found the path

        for (const coordinates of getAdjacent(current.x, current.y)) {
            const next = new Location(...coordinates)
            const nextScore = score[current.key]! + 1

            if (score[next.key] === undefined || nextScore < score[next.key]!) {
                previous[next.key] = current
                score[next.key] = nextScore
                next.priority = nextScore + end.distanceManhattan(next)
                frontier.put(next)
            }
        }
    }

    // Walk the path
    while (previous[end.key] !== undefined) {
        if (done(end.x, end.y)) return
        end = previous[end.key]!
    }
}
