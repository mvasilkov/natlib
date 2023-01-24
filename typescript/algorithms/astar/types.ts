export type Grid = any[][]

export type WalkFunction = (grid: Grid, x: number, y: number) => void

export type IsWalkable = (grid: Grid, x: number, y: number) => boolean

export interface AStar {
  grid: Grid,
  width: number,
  height: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  walkFunction?: WalkFunction,
  isWalkable?: IsWalkable,
  heuristic?: (...args: any[]) => any,
}
