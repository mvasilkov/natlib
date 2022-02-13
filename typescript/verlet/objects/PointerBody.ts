/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { IVec2 } from '../../Vec2'
import { Body } from '../Body.js'
import { Constraint } from '../Constraint.js'
import { Scene } from '../Scene.js'
import { Vertex } from '../Vertex.js'

/** Pointer body class for collision detection */
export class PointerBody extends Body {
    readonly r: number

    constructor(r: number) {
        // Not part of any scene, as it cannot resolve collisions.
        const detached = new Scene(r, r)
        super(detached)

        this.r = r

        // At least one constraint is required for the SAT function to work.
        const a = new Vertex(this, 0, 0)
        const b = new Vertex(this, r, 0)
        new Constraint(this, a, b, true)

        this.center = this.positions[0]!
        this.halfExtents.set(r, r)
    }

    /** Project the body onto a unit vector. */
    projectInterval(direction: Readonly<IVec2>) {
        const distanceInDirection = this.center.dot(direction)

        this.intervalLeft = distanceInDirection - this.r
        this.intervalRight = distanceInDirection + this.r
    }

    /** Set the pointer position. */
    setPosition(position: Readonly<IVec2>) {
        this.positions[0]!.copy(position)
        this.positions[1]!.set(position.x + this.r, position.y)
    }
}
