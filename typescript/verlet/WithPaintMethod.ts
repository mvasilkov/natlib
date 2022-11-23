/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'

type MetaBody = new (...args: any[]) => Body

/** Interpolated paint interface */
export interface IPaint {
    paint(con: CanvasRenderingContext2D, t: number): void
}

/** Make a body paintable on canvas. Used for debugging. */
export function WithPaintMethod<T extends MetaBody>(Parent: T, color = '#29adff', edgeColor = '#ff004d') {
    return class PaintBody extends Parent implements IPaint {
        /** Paint the body. */
        paint(con: CanvasRenderingContext2D, t: number) {
            this.vertices.forEach(v => v.interpolate(t))

            // Paint constraints that aren't edges
            con.beginPath()

            this.constraints.forEach(c => {
                if (c.edge) return
                con.moveTo(c.v0.interpolated.x, c.v0.interpolated.y)
                con.lineTo(c.v1.interpolated.x, c.v1.interpolated.y)
            })

            con.strokeStyle = color
            con.stroke()

            // Paint edges
            con.beginPath()

            this.edges.forEach(c => {
                con.moveTo(c.v0.interpolated.x, c.v0.interpolated.y)
                con.lineTo(c.v1.interpolated.x, c.v1.interpolated.y)
            })

            con.strokeStyle = edgeColor
            con.stroke()
        }
    }
}
