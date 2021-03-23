import { CanvasHandle } from '../../out/canvas/CanvasHandle.js'
import { Mulberry32 } from '../../out/prng/Mulberry32.js'

const seedInput = document.getElementById('seed')
const runButton = document.getElementById('run')
const noiseCanvas = document.getElementById('noise')
const distCanvas = document.getElementById('dist')

const noise = new CanvasHandle(noiseCanvas, 512, 512)
const dist = new CanvasHandle(distCanvas, 512, 512)

runButton.addEventListener('click', function () {
    const r = new Mulberry32(seedInput.value)
    const d = Array(512).fill(0)

    function* getBytes() {
        while (true) {
            const n = r.randomUint32()

            ++d[n % 512]

            yield n & 255
            yield (n >>> 8) & 255
            yield (n >>> 16) & 255
            yield (n >>> 24) & 255
        }
    }

    const bytes = getBytes()

    for (let y = 0; y < 512; ++y) {
        for (let x = 0; x < 512; ++x) {
            const b = bytes.next().value

            noise.con.fillStyle = `rgb(${b},${b},${b})`
            noise.con.fillRect(x, y, 1, 1)
        }
    }

    dist.con.fillStyle = 'rgb(255,255,255)'

    for (let x = 0; x < 512; ++x) {
        dist.con.fillRect(x, 512 - d[x], 1, d[x])
    }
})
