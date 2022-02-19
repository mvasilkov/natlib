/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { IVec2 } from '../../Vec2'
import type { Body } from '../Body'
import type { Vertex } from '../Vertex'

/** Find a vertex closest to the reference point. */
export function getClosestVertex(b: Body, reference: Readonly<IVec2>): Vertex {
    let closestVertex = b.vertices[0]!
    let shortestDistance = closestVertex.position.distanceSquared(reference)

    // Loop over b.positions, excluding b.positions[0].
    for (let n = b.positions.length; --n > 0;) {
        const distance = b.positions[n]!.distanceSquared(reference)

        if (distance < shortestDistance) {
            shortestDistance = distance
            closestVertex = b.vertices[n]!
        }
    }

    return closestVertex
}
