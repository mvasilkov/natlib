/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Vec2 } from '../Vec2.js'
import type { Constraint } from './Constraint'
import type { Scene } from './Scene'
import type { Vertex } from './Vertex'

/** Physical body class (Verlet integration) */
export class Body {
    scene: Scene
    vertices: Vertex[]
    constraints: Constraint[]
    /** Positions of vertices */
    positions: Vec2[]
    /** Edges are constraints that define the object's boundary. */
    edges: Constraint[]

    mass: number
    groundFriction: number

    // Values set by updateBoundingBox()
    center: Vec2
    halfExtents: Vec2

    // Values set by projectInterval()
    intervalLeft: number
    intervalRight: number

    constructor(scene: Scene, mass = 1, groundFriction = 0) {
        this.scene = scene
        this.vertices = []
        this.constraints = []
        this.positions = []
        this.edges = []

        this.mass = mass
        this.groundFriction = groundFriction

        this.center = new Vec2
        this.halfExtents = new Vec2

        this.intervalLeft = this.intervalRight = 0

        scene.bodies.push(this)
    }
}
