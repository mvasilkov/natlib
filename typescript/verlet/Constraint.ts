/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
 */
'use strict'

import type { Body } from './Body'

/** Constraint class (Verlet integration) */
export class Constraint {
    parent: Body

    constructor(parent: Body) {
        this.parent = parent
    }
}
