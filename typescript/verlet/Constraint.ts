/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'

/** Constraint class (Verlet integration) */
export class Constraint {
    body: Body

    constructor(body: Body) {
        this.body = body
    }
}
