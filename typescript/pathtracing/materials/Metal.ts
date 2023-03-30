/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

import type { IPrng32 } from '../../prng/prng'
import { register5 } from '../../runtime.js'
import type { IVec3, Vec3 } from '../../Vec3'
import type { HitProperties, IMaterial } from '../pathtracing'
import { Material } from './Material.js'

/** Material subclass featuring specular reflection */
export class Metal extends Material implements IMaterial {
    roughness: number

    constructor(prng: IPrng32, albedo?: Readonly<IVec3>, roughness = 0) {
        super(prng, albedo)

        this.roughness = roughness
    }

    override scatter({ direction, normal }: Pick<HitProperties, 'direction' | 'normal'>): Vec3 {
        // Specular
        register5.setMultiplyScalar(normal, -2 * direction.dot(normal)).add(direction)

        if (this.roughness > 0) {
            // Diffuse
            return register5.add(super.scatter({ normal }).scale(this.roughness))
        }

        return register5
    }
}
