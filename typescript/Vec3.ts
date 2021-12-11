/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
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
}
