import { CanvasHandle } from '../natlib/canvas/CanvasHandle.js'
import { noiseAndDist, fisherYates } from '../natlib/test/visualizePRNG32.js'

const seedInput = document.getElementById('seed')
const runButton = document.getElementById('run')

const noiseCanvas = new CanvasHandle(document.getElementById('noise'), 512, 512)
const distCanvas = new CanvasHandle(document.getElementById('dist'), 512, 512)
const shuffleCanvas = new CanvasHandle(document.getElementById('shuffle'), 512, 512)

runButton.addEventListener('click', function () {
    noiseAndDist('Mulberry32', +seedInput.value, noiseCanvas, distCanvas)
    fisherYates('Mulberry32', +seedInput.value, shuffleCanvas)
})
