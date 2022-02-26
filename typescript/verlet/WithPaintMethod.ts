/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { IPaint } from '../canvas/canvas'
import type { Body } from './Body'

type BodyCons = new (...args: any[]) => Body

/** Enable a body to be painted on canvas. Used for debugging. */
export function WithPaintMethod<T extends BodyCons>(Base: T, color = '#29adff', colorEdges = '#ff004d') {
    return class BodyPaint extends Base implements IPaint {
        /** Paint the body. */
        paint(con: CanvasRenderingContext2D, t: number) {
            for (const v of this.vertices) v.interpolate(t)

            // Paint constraints that aren't edges
            con.beginPath()

            for (const c of this.constraints) {
                if (c.edge) continue
                con.moveTo(c.v0.interpolated.x, c.v0.interpolated.y)
                con.lineTo(c.v1.interpolated.x, c.v1.interpolated.y)
            }

            con.strokeStyle = color
            con.stroke()

            // Paint edges
            con.beginPath()

            for (const c of this.edges) {
                con.moveTo(c.v0.interpolated.x, c.v0.interpolated.y)
                con.lineTo(c.v1.interpolated.x, c.v1.interpolated.y)
            }

            con.strokeStyle = colorEdges
            con.stroke()
        }
    }
}
