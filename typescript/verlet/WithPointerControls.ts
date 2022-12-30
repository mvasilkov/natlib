/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { findCollision } from '../collision/sat.js'
import type { Pointer } from '../controls/Pointer'
import { register0 } from '../runtime.js'
import { getClosestVertex } from './Body.js'
import { PointerBody } from './objects/PointerBody.js'
import type { Scene } from './Scene'
import type { Vertex } from './Vertex'

type MetaScene = new (...args: any[]) => Scene

/** Enable scene's vertices to be controlled by the pointer. */
export function WithPointerControls<T extends MetaScene>(Parent: T, pointer: Pointer, r: number, stiffness = 1) {
    const pb = new PointerBody(r)

    return class PointerScene extends Parent {
        controlledVertex?: Vertex

        /** Update the scene. */
        override update() {
            // Set the controlled vertex.
            if (pointer.held) {
                if (!this.controlledVertex) {
                    pb.setPosition(pointer)

                    this.bodies.some(b => findCollision(b, pb) &&
                        (this.controlledVertex = b.vertices[getClosestVertex(b, pointer)]!))
                }
            }
            else {
                this.controlledVertex = undefined
            }

            super.update()

            // Set the controlled vertex position.
            this.controlledVertex?.position.add(
                register0.setSubtract(pointer, this.controlledVertex.position).scale(stiffness))
        }
    }
}
