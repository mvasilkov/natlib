/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */
'use strict'

/** 3D vector data structure */
export interface IVec3 {
    x: number
    y: number
    z: number
}

/** 3D vector class */
export class Vec3 implements IVec3 {
    x: number
    y: number
    z: number

    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    /** Set the components of this vector. */
    set(x: number, y: number, z: number): this {
        this.x = x
        this.y = y
        this.z = z
        return this
    }

    /** Copy the components of a vector to this vector. */
    copy(other: Readonly<IVec3>): this {
        this.x = other.x
        this.y = other.y
        this.z = other.z
        return this
    }

    /** Add a vector to this vector. */
    add(other: Readonly<IVec3>): this {
        this.x += other.x
        this.y += other.y
        this.z += other.z
        return this
    }

    /** Subtract a vector from this vector. */
    subtract(other: Readonly<IVec3>): this {
        this.x -= other.x
        this.y -= other.y
        this.z -= other.z
        return this
    }

    /** Multiply this vector by a scalar. */
    scale(n: number): this {
        this.x *= n
        this.y *= n
        this.z *= n
        return this
    }

    /** Set this vector to a scalar multiple of a vector. */
    setMultiplyScalar(other: Readonly<IVec3>, n: number): this {
        this.x = other.x * n
        this.y = other.y * n
        this.z = other.z * n
        return this
    }

    /** Get the length of this vector. */
    length(): number {
        return (this.x ** 2 + this.y ** 2 + this.z ** 2) ** 0.5
    }

    /** Convert this vector to a unit vector. */
    normalize(): this {
        const len = this.length()
        if (len !== 0) {
            this.x /= len
            this.y /= len
            this.z /= len
        }
        return this
    }

    /** Get the dot product of two vectors. */
    dot(other: Readonly<IVec3>): number {
        return this.x * other.x + this.y * other.y + this.z * other.z
    }
}

// These variables are used to avoid garbage collection of
// short-lived objects at runtime.
export const register0 = /*@__PURE__*/ new Vec3
export const register1 = /*@__PURE__*/ new Vec3
export const register2 = /*@__PURE__*/ new Vec3
export const register3 = /*@__PURE__*/ new Vec3
