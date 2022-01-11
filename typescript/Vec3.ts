/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
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
    set(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    /** Add the other vector to this vector. */
    add(other: Readonly<IVec3>) {
        this.x += other.x
        this.y += other.y
        this.z += other.z
    }

    /** Multiply this vector by a scalar. */
    scale(n: number) {
        this.x *= n
        this.y *= n
        this.z *= n
    }

    /** Get the dot product of this vector and the other vector. */
    dot(other: Readonly<IVec3>): number {
        return this.x * other.x + this.y * other.y + this.z * other.z
    }
}
