/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Vec2 } from './Vec2.js'

// The following variables are used to avoid the garbage collection of
// short-lived objects at runtime.
export const register0 = new Vec2
export const register1 = new Vec2
