/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

/** 2D vector data structure */
interface IVec2 {
    x: number
    y: number
}

/** 2D vector class */
class NVec2 implements IVec2 {
    x: number
    y: number

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    /** Set the components of this vector. */
    set(x: number, y: number) {
        this.x = x
        this.y = y
    }

    /** Copy the components of the other vector to this vector. */
    copy(other: IVec2) {
        this.x = other.x
        this.y = other.y
    }

    /** Get the length of this vector. */
    length(): number {
        return (this.x ** 2 + this.y ** 2) ** 0.5
    }

    /** Add the other vector to this vector. */
    add(other: IVec2) {
        this.x += other.x
        this.y += other.y
    }

    /** Subtract the other vector from this vector. */
    subtract(other: IVec2) {
        this.x -= other.x
        this.y -= other.y
    }

    /** Set this vector to `a` − `b`. */
    setSubtract(a: IVec2, b: IVec2) {
        this.x = a.x - b.x
        this.y = a.y - b.y
    }

    /** Multiply this vector by a scalar. */
    scale(n: number) {
        this.x *= n
        this.y *= n
    }

    /** Set this vector to a scalar multiple of the other vector. */
    setMultiplyScalar(other: IVec2, n: number) {
        this.x = other.x * n
        this.y = other.y * n
    }

    /** Get the dot product of this vector and the other vector. */
    dot(other: IVec2): number {
        return this.x * other.x + this.y * other.y
    }
}
