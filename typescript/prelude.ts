/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

// Types that are used for documentation.
export type uint8_t = number
export type uint32_t = number

export const UINT8_MAX = 255
export const UINT32_MAX = 4294967295

// Compact Boolean type
export type ShortBool = 0 | 1 | undefined

export const FALSE: ShortBool = 0
export const TRUE: ShortBool = 1
