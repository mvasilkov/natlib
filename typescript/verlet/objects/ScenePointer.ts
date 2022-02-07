/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Body } from '../Body.js'
import type { Scene } from '../Scene'

class PointerBody extends Body {
}

type SceneCons = new (...args: any[]) => Scene

export function ScenePointerMixin<T extends SceneCons>(Base: T) {
    return class ScenePointer extends Base {
    }
}
