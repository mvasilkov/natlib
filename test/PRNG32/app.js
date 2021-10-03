/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import { CanvasHandle } from '../natlib/canvas/CanvasHandle.js'
import { noiseAndDist, fisherYates } from '../natlib/test/visualizePrng32.js'

const seedInput = document.getElementById('seed')
const startButton = document.getElementById('start')

const noiseCanvas = new CanvasHandle(document.getElementById('noise'), 512, 512)
const distCanvas = new CanvasHandle(document.getElementById('dist'), 512, 512)
const shuffleCanvas = new CanvasHandle(document.getElementById('shuffle'), 512, 512)

startButton.addEventListener('click', function () {
    const prng = document.querySelector('input[name="prng"]:checked').value
    const seed = +seedInput.value

    noiseAndDist(prng, seed, noiseCanvas, distCanvas)
    fisherYates(prng, seed, shuffleCanvas)
})
