/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

/** Callback function type */
type LoopCallback = (t: number) => void

export function startMainloop(update: LoopCallback, render: LoopCallback, T = 0.02) {
}
