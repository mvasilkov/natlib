/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlib/blob/master/examples/LICENSE
 */
'use strict'

import type { Vertex } from './node_modules/natlib/verlet/Vertex'

// Extend the scene vertically.
const SCENE_EXT_TOP = -300
const SCENE_EXT_BOTTOM = 300

/** Verlet integration */
export function integrateVertex(this: Vertex, sceneWidth: number, sceneHeight: number) {
    const pos = this.position
    const old = this.oldPosition
    const x = pos.x
    const y = pos.y

    pos.x += (x - old.x) * this.viscosity
    pos.y += (y - old.y) * this.viscosity + this.gravity

    old.set(x, y)

    // Scene bounds
    if (pos.y < SCENE_EXT_TOP) pos.y = SCENE_EXT_TOP
    else if (pos.y >= (sceneHeight += SCENE_EXT_BOTTOM)) {
        pos.x -= (pos.x - x) * this.body.groundFriction
        pos.y = sceneHeight - 1
    }

    if (pos.x < 0) pos.x = 0
    else if (pos.x >= sceneWidth) {
        pos.x = sceneWidth - 1
    }
}
