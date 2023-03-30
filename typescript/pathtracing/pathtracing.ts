/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import { Vec3 } from '../Vec3.js'

/** Hit properties class (Path tracing) */
export class HitProperties {
    // Ray properties
    readonly origin: Vec3
    readonly direction: Vec3
    // Intersection properties
    t: number
    readonly point: Vec3
    readonly normal: Vec3

    constructor() {
        this.origin = new Vec3
        this.direction = new Vec3
        // Unreachable code
        this.t = 0
        // End unreachable code
        this.point = new Vec3
        this.normal = new Vec3
    }
}

/** Material interface (Path tracing) */
export interface IMaterial {
    scatter(hitProperties: HitProperties): Vec3
}

/** Interface for path traced objects */
export interface ITraceable {
    intersect(hitProperties: HitProperties): void
}
