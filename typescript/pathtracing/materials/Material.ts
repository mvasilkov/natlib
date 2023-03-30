/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import type { IPrng32 } from '../../prng/prng'
import { uniformSampleHemisphere } from '../../prng/sampling.js'
import { Vec3, type IVec3 } from '../../Vec3.js'
import type { HitProperties, IMaterial } from '../pathtracing'

/** Material class (Path tracing) */
export class Material implements IMaterial {
    prng: IPrng32
    albedo: Vec3
    emission: Vec3

    constructor(prng: IPrng32, albedo?: Readonly<IVec3>, emission?: Readonly<IVec3>) {
        this.prng = prng
        this.albedo = new Vec3
        this.emission = new Vec3

        if (albedo) this.albedo.copy(albedo)
        if (emission) this.emission.copy(emission)
    }

    /** Get the ray direction after hitting an object. */
    scatter({ normal }: Pick<HitProperties, 'normal'>): Vec3 {
        return uniformSampleHemisphere(this.prng, normal)
    }
}
