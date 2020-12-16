/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

interface IVec2 {
    x: number
    y: number
}

class NVec2 implements IVec2 {
    x: number
    y: number

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    set(x: number, y: number) {
        this.x = x
        this.y = y
    }

    copy(other: IVec2) {
        this.x = other.x
        this.y = other.y
    }

    length(): number {
        return (this.x ** 2 + this.y ** 2) ** 0.5
    }

    add(other: IVec2) {
        this.x += other.x
        this.y += other.y
    }

    subtract(other: IVec2) {
        this.x -= other.x
        this.y -= other.y
    }

    setSubtract(a: IVec2, b: IVec2) {
        this.x = a.x - b.x
        this.y = a.y - b.y
    }

    scale(a: number) {
        this.x *= a
        this.y *= a
    }

    setMultiplyScalar(other: IVec2, a: number) {
        this.x = other.x * a
        this.y = other.y * a
    }

    dot(other: IVec2): number {
        return this.x * other.x + this.y * other.y
    }
}
