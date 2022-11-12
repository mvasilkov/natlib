/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'
import type { Constraint } from './Constraint'
import type { Vertex } from './Vertex'

/** Scene class (Verlet integration) */
export class Scene {
    vertices: Vertex[]
    constraints: Constraint[]
    bodies: Body[]

    height: number
    width: number
    iterationCount: number
    friction: number

    constructor(width: number, height: number, iterationCount = 9, friction = 0) {
        this.vertices = []
        this.constraints = []
        this.bodies = []

        this.height = height
        this.width = width
        this.iterationCount = iterationCount
        this.friction = friction
    }
}
