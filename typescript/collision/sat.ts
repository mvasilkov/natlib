/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { register0 } from '../runtime.js'
import type { Body } from '../verlet/Body'
import type { Constraint } from '../verlet/Constraint'

const projectionLine = register0

/** Projected distance function */
function projectedDistance(b0: Body, b1: Body, edge: Constraint): number {
    // Find a unit vector normal to the edge.
    projectionLine.setPerpendicular(edge.p0, edge.p1).normalize()

    // Project the bodies onto the normal.
    b0.projectInterval(projectionLine)
    b1.projectInterval(projectionLine)

    // Return the distance between the intervals.
    return b0.intervalLeft < b1.intervalLeft ?
        b1.intervalLeft - b0.intervalRight :
        b0.intervalLeft - b1.intervalRight
}
