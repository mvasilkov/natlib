/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import { Vec2 } from './Vec2.js'

// These variables are used to avoid garbage collection of
// short-lived objects at runtime.
export const register0 = new Vec2
export const register1 = new Vec2
export const register2 = new Vec2
export const register3 = new Vec2
