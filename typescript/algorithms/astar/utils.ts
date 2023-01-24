import { Vec2 } from '../../Vec2.js'

export class Vec2WithPriority extends Vec2 {
  // Can't change these without invalidating the hash
  declare readonly x: number
  declare readonly y: number

  readonly hash: number
  priority: number

  constructor(x: number, y: number) {
    super(x, y)

    this.hash = this.y << 16 | this.x
    this.priority = 0
  }
}

/** Get the neighbourhood of connected points. */
export const getConnected = (
  rows: number,
  cols: number,
  x: number,
  y: number
): Vec2WithPriority[] => {
  const connected: Vec2WithPriority[] = []

  // left
  if (x > 0)
    connected.push(new Vec2WithPriority(x - 1, y))
  // top
  if (y > 0)
    connected.push(new Vec2WithPriority(x, y - 1))
  // right
  if (x < rows - 1)
    connected.push(new Vec2WithPriority(x + 1, y))
  // bottom
  if (y < cols - 1)
    connected.push(new Vec2WithPriority(x, y + 1))

  return connected
}

/** Manhattan distance on a square grid */
export const manhattan = (
  x0: number,
  x1: number,
  y0: number,
  y1: number
): number => {
  return Math.abs(x0 - x1) + Math.abs(y0 - y1)
}
