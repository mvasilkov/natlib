/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Constraint } from './Constraint'
import type { Scene } from './Scene'
import type { Vertex } from './Vertex'

/** Physical body class (Verlet integration) */
export class Body {
    scene: Scene
    vertices: Vertex[]
    constraints: Constraint[]

    constructor(scene: Scene) {
        this.scene = scene
        this.vertices = []
        this.constraints = []
    }
}
