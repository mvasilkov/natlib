/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { WalkFunction } from './types'
import {
    Vec2WithPriority,
    getConnected,
    isTraversable,
    manhattan,
} from './utils'

import { PriorityQueue } from '../PriorityQueue'

/** `A*` path finding algorithm */
export const astar = (
    grid: number[][],
    width: number,
    height: number,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    walkFunction: WalkFunction,
    isWalkable: (index: number) => boolean = isTraversable,
    heuristic: (...args: any[]) => any = manhattan,
) => {
    const start = new Vec2WithPriority(x0, y0)
    // Critical default: start.priority = 0

    const frontier = new PriorityQueue<Vec2WithPriority>(
        (a, b) => a.priority - b.priority, // Sort ascending
        [start],
    )

    const previous: { [n: number]: Vec2WithPriority } = Object.create(null)
    const score: { [n: number]: number } = Object.create(null)

    score[start.hash] = 0

    while (frontier.length !== 0) {
        const current = frontier.get()!

        if (current.x === x1 && current.y === y1) {
            break // Found the path
        }

        for (const next of getConnected(width, height, current.x, current.y)) {
            const nextScore = score[current.hash] + 1

            if (isWalkable(grid[next.y][next.x]) && (score[next.hash] === undefined || nextScore < score[next.hash])) {
                previous[next.hash] = current
                score[next.hash] = nextScore
                next.priority = nextScore + heuristic(x1, y1, next.x, next.y)
                frontier.put(next)
            }
        }
    }

    // Walk the path
    let end = new Vec2WithPriority(x1, y1)
    while (previous[end.hash] !== undefined) {
        walkFunction(end.x, end.y)
        end = previous[end.hash]
    }
}
