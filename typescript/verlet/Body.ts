/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { Vec2, type IVec2 } from '../Vec2.js'
import type { Constraint } from './Constraint'
import type { Scene } from './Scene'
import type { Vertex } from './Vertex'

/** Physical body class (Verlet integration) */
export class Body {
    readonly scene: Scene
    readonly vertices: Vertex[]
    readonly constraints: Constraint[]
    /** Positions of vertices */
    readonly positions: Vec2[]
    /** Edges are constraints that define the object's boundary. */
    readonly edges: Constraint[]

    mass: number
    groundFriction: number

    // Values set by updateBoundingBox()
    readonly center: Vec2
    readonly halfExtents: Vec2

    // Values set by projectInterval()
    intervalLeft: number
    intervalRight: number
    leftIndex: number
    rightIndex: number

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
        this.leftIndex = this.rightIndex = 0

        scene.bodies.push(this)
    }

    /** Update the bounding box (AABB). */
    updateBoundingBox() {
        let left: number, top: number, right: number, bottom: number
        let p = this.positions[0]!
        left = right = p.x
        top = bottom = p.y

        // Loop over positions, excluding positions[0].
        for (let n = this.positions.length; --n > 0;) {
            p = this.positions[n]!

            if (p.x < left) left = p.x
            else if (p.x > right) right = p.x

            if (p.y < top) top = p.y
            else if (p.y > bottom) bottom = p.y
        }

        this.center.set(0.5 * (left + right), 0.5 * (top + bottom))
        this.halfExtents.set(0.5 * (right - left), 0.5 * (bottom - top))
    }

    /** Project the body onto a unit vector. */
    projectInterval(direction: Readonly<IVec2>) {
        let left: number, right: number
        left = right = this.positions[0]!.dot(direction)
        this.leftIndex = this.rightIndex = 0

        // Loop over positions, excluding positions[0].
        for (let n = this.positions.length; --n > 0;) {
            const distanceInDirection = this.positions[n]!.dot(direction)

            if (distanceInDirection < left) {
                left = distanceInDirection
                this.leftIndex = n
            }
            else if (distanceInDirection > right) {
                right = distanceInDirection
                this.rightIndex = n
            }
        }

        this.intervalLeft = left
        this.intervalRight = right
    }
}

/** Find a vertex closest to the reference point.
 * Standalone function to enable tree shaking. */
export function getClosestVertex({ positions }: Body, point: Readonly<IVec2>): number {
    let closestVertex = 0
    let shortestDistance = positions[0]!.distanceSquared(point)

    // Loop over positions, excluding positions[0].
    for (let n = positions.length; --n > 0;) {
        const distance = positions[n]!.distanceSquared(point)

        if (distance < shortestDistance) {
            shortestDistance = distance
            closestVertex = n
        }
    }

    return closestVertex
}
