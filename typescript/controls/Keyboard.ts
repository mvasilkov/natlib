/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

type Code = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD' | 'Space'

type Hashed<T extends string> =
    T extends `${infer Chr0}${infer _Chr1}${infer _Chr2}${infer Chr3}${infer _Chr4}${infer Chr5}${infer _Rest}` ? `${Chr0}${Chr3}${Chr5}` :
    T extends `${infer Chr0}${infer _Chr1}${infer _Chr2}${infer Chr3}${infer _Rest}` ? `${Chr0}${Chr3}` : never

export const enum Action { LEFT, UP, RIGHT, DOWN, LEFT_A, UP_W, RIGHT_D, DOWN_S, SPACE }

const actions: { [HashedCode in Hashed<Code>]: Action } = {
    AoL: Action.LEFT,
    AoU: Action.UP,
    AoR: Action.RIGHT,
    AoD: Action.DOWN,
    KA: Action.LEFT_A,
    KW: Action.UP_W,
    KD: Action.RIGHT_D,
    KS: Action.DOWN_S,
    Sc: Action.SPACE,
}
