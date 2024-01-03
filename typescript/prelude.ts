/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

// Types used for documentation
export type uint8_t = number
export type uint16_t = number
export type uint32_t = number
export type uint64_t = bigint

export const UINT8_MAX = 255
export const UINT16_MAX = 65535
export const UINT32_MAX = 4294967295
export const UINT64_MAX = 18446744073709551615n

/** Extended Boolean type */
export type ExtendedBool = boolean | 0 | 1 | undefined

/** Compact Boolean values */
export const enum ShortBool { FALSE, TRUE }

/** Check if the types are equal. */
export type Equal<Left, Right> =
    (<T>() => T extends Left ? true : false) extends
    (<T>() => T extends Right ? true : false) ? true : false

export type PositiveInteger<Value extends number = number> =
    // Check if Value is a variable.
    Equal<Value, number> extends true ? Value :
    // Value is a literal, ensure it parses as a bigint and is not negative or zero.
    `${Value}` extends `${bigint}` ? `${Value}` extends '0' | `-${string}` ? never : Value : never

export type NonnegativeInteger<Value extends number = number> =
    // Check if Value is a variable.
    Equal<Value, number> extends true ? Value :
    // Value is a literal, ensure it parses as a bigint and is not negative.
    `${Value}` extends `${bigint}` ? `${Value}` extends `-${string}` ? never : Value : never

export type MethodsReturningType<T, Return> = {
    [K in keyof T]: T[K] extends (...a: any) => Return ? K : never
}[keyof T]
