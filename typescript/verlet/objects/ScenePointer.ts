/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Body } from '../Body.js'
import { Scene } from '../Scene.js'

export class PointerBody extends Body {
    r: number

    constructor(r: number) {
        const detached = new Scene(0, 0)
        super(detached)

        this.r = r
    }
}

type SceneCons = new (...args: any[]) => Scene

export function ScenePointerMixin<T extends SceneCons>(Base: T) {
    return class ScenePointer extends Base {
    }
}
