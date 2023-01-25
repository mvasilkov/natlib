/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { AStar } from './types'
import {
  Vec2WithPriority,
  getConnected,
  manhattan,
} from './utils'

import { PriorityQueue } from '../../collections/PriorityQueue'

/** `A*` path finding algorithm */
export const astar = ({
  grid,
  x0,
  y0,
  x1,
  y1,
  walkFunction = () => {},
  isWalkable = () => true,
  heuristic = manhattan,
}: AStar) => {
  // Critical default: start.priority = 0
  const start = new Vec2WithPriority(x0, y0)
  const rows = grid.length
  const cols = grid[0]!.length

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

    for (const next of getConnected(rows, cols, current.x, current.y)) {
      const nextScore = score[current.hash]! + 1

      if (
        isWalkable(grid, next.x, next.y) &&
        (score[next.hash] === undefined || nextScore < score[next.hash]!)
      ) {
        previous[next.hash] = current
        score[next.hash] = nextScore
        next.priority = nextScore + heuristic(x1, y1, next.x, next.y)
        frontier.put(next)
      }
    }
  }

  // Walk the path
  let end = new Vec2WithPriority(x1, y1)

  if (previous[end.hash] !== undefined) {
    while (end !== undefined) {
      walkFunction(grid, end.x, end.y)
      end = previous[end.hash]!
    }
  }
}
