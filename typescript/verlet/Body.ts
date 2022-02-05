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

    // Values returned by boundingBox()
    center: Vec2
    halfExtents: Vec2

    // Values returned by projectOnto()
    projectionMin: number
    projectionMax: number

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

        this.projectionMin = this.projectionMax = 0
    }

    /** Compute the bounding box. */
    boundingBox() {
        let xMin: number, xMax: number, yMin: number, yMax: number
        let p = this.positions[0]!
        xMin = xMax = p.x
        yMin = yMax = p.y

        // Loop over positions, excluding positions[0].
        for (let n = this.positions.length; --n > 0;) {
            p = this.positions[n]!

            if (p.x < xMin) xMin = p.x
            else if (p.x > xMax) xMax = p.x

            if (p.y < yMin) yMin = p.y
            else if (p.y > yMax) yMax = p.y
        }

        this.center.set((xMin + xMax) * 0.5, (yMin + yMax) * 0.5)
        this.halfExtents.set((xMax - xMin) * 0.5, (yMax - yMin) * 0.5)
    }

    /** Project the body onto a unit vector. */
    projectOnto(a: Readonly<Vec2>) {
        let pMin: number, pMax: number
        pMin = pMax = this.positions[0]!.dot(a)

        // Loop over positions, excluding positions[0].
        for (let n = this.positions.length; --n > 0;) {
            const product = this.positions[n]!.dot(a)

            if (product < pMin) pMin = product
            else if (product > pMax) pMax = product
        }

        this.projectionMin = pMin
        this.projectionMax = pMax
    }

    /** Support function */
    farthestPointInDirection(direction: Readonly<Vec2>): Vertex {
        let v = this.vertices[0]!
        let p = v.position.dot(direction)

        // Loop over positions, excluding positions[0].
        for (let n = this.positions.length; --n > 0;) {
            const product = this.positions[n]!.dot(direction)

            if (product > p) {
                p = product
                v = this.vertices[n]!
            }
        }

        return v
    }
}
