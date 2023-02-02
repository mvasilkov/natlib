/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

// Types that are used for documentation.
export type uint8_t = number
export type uint16_t = number
export type uint32_t = number

export const UINT8_MAX = 255
export const UINT16_MAX = 65535
export const UINT32_MAX = 4294967295

// Type assertions
export type PositiveInteger<T extends number> = `${T}` extends '0' | `-${any}` | `${any}.${any}` ? never : T
export type NonnegativeInteger<T extends number> = `${T}` extends `-${any}` | `${any}.${any}` ? never : T

// Compact Boolean type
export type ShortBool = 0 | 1 | undefined

export const FALSE: ShortBool = 0
export const TRUE: ShortBool = 1

// Extended Boolean type
export type ExtendedBool = boolean | ShortBool
