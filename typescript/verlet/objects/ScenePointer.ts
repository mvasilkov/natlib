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

export class PointerBody extends Body {
    readonly r: number

    constructor(r: number) {
        const detached = new Scene(0, 0)
        super(detached)

        this.r = r

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

    setPosition(position: Readonly<IVec2>) {
        this.positions[0]!.copy(position)
        this.positions[1]!.set(position.x + this.r, position.y)
    }
}

type SceneCons = new (...args: any[]) => Scene

export function ScenePointerMixin<T extends SceneCons>(Base: T) {
    return class ScenePointer extends Base {
    }
}
