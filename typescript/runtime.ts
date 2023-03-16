/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { Vec2 } from './Vec2.js'
import { Vec3 } from './Vec3.js'

// These variables are used to avoid garbage collection of
// short-lived objects at runtime.
export const register0 = /*@__PURE__*/ new Vec2
export const register1 = /*@__PURE__*/ new Vec2
export const register2 = /*@__PURE__*/ new Vec2
export const register3 = /*@__PURE__*/ new Vec2

export const register4 = /*@__PURE__*/ new Vec3
export const register5 = /*@__PURE__*/ new Vec3
export const register6 = /*@__PURE__*/ new Vec3
export const register7 = /*@__PURE__*/ new Vec3
