/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import { CanvasHandle } from '../natlib/canvas/CanvasHandle.js'
import { visualizeNoise3 } from '../natlib/test/visualizeNoise3.js'

const scaleInput = document.getElementById('scale')
const seedInput = document.getElementById('seed')
const startButton = document.getElementById('start')

const noiseCanvas = new CanvasHandle(document.getElementById('noise'), 512, 512)

startButton.addEventListener('click', function () {
    const noiseFunction = document.querySelector('input[name="nofun"]:checked').value
    const scale = +scaleInput.value
    const prng = document.querySelector('input[name="prng"]:checked').value
    const seed = +seedInput.value

    visualizeNoise3(noiseFunction, scale, prng, seed, noiseCanvas)
})
