/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Scene } from '../Scene'

type SceneCons = new (...args: any[]) => Scene

export function WithPointerControls<T extends SceneCons>(Base: T) {
    return class ScenePointer extends Base {
    }
}
