/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { findCollision } from '../../collision/sat.js'
import type { Pointer } from '../../controls/Pointer'
import { register0 } from '../../runtime.js'
import type { Scene } from '../Scene'
import type { Vertex } from '../Vertex'
import { getClosestVertex } from './helpers.js'
import { PointerBody } from './PointerBody.js'

type SceneCons = new (...args: any[]) => Scene

/** Enable scene's vertices to be controlled by the pointer. */
export function WithPointerControls<T extends SceneCons>(Base: T, stiffness = 1) {
    return class ScenePointer extends Base {
        // @ts-ignore: Must call setPointer() before use.
        pointer: Pointer
        // @ts-ignore: Must call setPointer() before use.
        pb: PointerBody

        controlledVertex?: Vertex

        /** Initialize pointer controls. */
        setPointer(pointer: Pointer, r = 4) {
            this.pointer = pointer
            this.pb = new PointerBody(r)
        }

        /** Set the position of the controlled vertex. */
        integrate() {
            if (this.controlledVertex !== undefined) {
                register0.setSubtract(this.pointer, this.controlledVertex.position)
                register0.scale(stiffness)
                this.controlledVertex.position.add(register0)
            }

            super.integrate()
        }

        /** Set the controlled vertex. */
        solve() {
            super.solve()

            if (this.pointer.held) {
                if (this.controlledVertex !== undefined) return

                this.pb.setPosition(this.pointer)

                for (const b of this.bodies) {
                    if (findCollision(b, this.pb)) {
                        this.controlledVertex = getClosestVertex(b, this.pointer)
                    }
                }
            }
            else {
                this.controlledVertex = undefined
            }
        }
    }
}
