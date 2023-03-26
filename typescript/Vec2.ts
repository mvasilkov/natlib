/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import type { MethodsReturningType } from './prelude'

/** 2D vector data structure */
export interface IVec2 {
    x: number
    y: number
}

/** 2D vector class */
export class Vec2 implements IVec2 {
    x: number
    y: number

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    /** Set the components of this vector. */
    set(x: number, y: number): this {
        this.x = x
        this.y = y
        return this
    }

    /** Copy the components of a vector to this vector. */
    copy(other: Readonly<IVec2>): this {
        this.x = other.x
        this.y = other.y
        return this
    }

    /** Add a vector to this vector. */
    add(other: Readonly<IVec2>): this {
        this.x += other.x
        this.y += other.y
        return this
    }

    /** Subtract a vector from this vector. */
    subtract(other: Readonly<IVec2>): this {
        this.x -= other.x
        this.y -= other.y
        return this
    }

    /** Set this vector to `a` − `b`. */
    setSubtract(a: Readonly<IVec2>, b: Readonly<IVec2>): this {
        this.x = a.x - b.x
        this.y = a.y - b.y
        return this
    }

    /** Set this vector to a perpendicular to the vector `ab`. */
    setPerpendicular(a: Readonly<IVec2>, b: Readonly<IVec2>): this {
        this.x = a.y - b.y
        this.y = b.x - a.x
        return this
    }

    /** Multiply this vector by a scalar. */
    scale(n: number): this {
        this.x *= n
        this.y *= n
        return this
    }

    /** Set this vector to a scalar multiple of a vector. */
    setMultiplyScalar(other: Readonly<IVec2>, n: number): this {
        this.x = other.x * n
        this.y = other.y * n
        return this
    }

    /** Get the length of this vector. */
    length(): number {
        return Math.hypot(this.x, this.y)
    }

    /** Convert this vector to a unit vector. */
    normalize(): this {
        const len = this.length()
        if (len !== 0) {
            this.x /= len
            this.y /= len
        }
        return this
    }

    /** Get the dot product of two vectors. */
    dot(other: Readonly<IVec2>): number {
        return this.x * other.x + this.y * other.y
    }

    /** Get the squared distance between two vectors. */
    distanceSquared(other: Readonly<IVec2>): number {
        return (this.x - other.x) ** 2 + (this.y - other.y) ** 2
    }
}

type MutatorMethods = MethodsReturningType<Vec2, Vec2>

/** Read-only 2D vector type */
export type ReadonlyVec2 = Readonly<Omit<Vec2, MutatorMethods>>
