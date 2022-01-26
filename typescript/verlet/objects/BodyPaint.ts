/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { IPaint } from '../../canvas/canvas'
import { Body } from '../Body'

type BodyCons = new (...args: any[]) => Body

/** Enable a body to be painted on canvas. */
export function BodyPaintMixin<T extends BodyCons>(Base: T) {
    return class BodyPaint extends Base implements IPaint {
        /** Generic paint function */
        paint(con: CanvasRenderingContext2D, t: number) {
        }
    }
}
