import { CanvasHandle } from '../natlib/canvas/CanvasHandle.js'
import { Mulberry32 } from '../natlib/prng/Mulberry32.js'
import { shuffle } from '../natlib/prng/functions.js'

const seedInput = document.getElementById('seed')
const runButton = document.getElementById('run')
const noiseCanvas = document.getElementById('noise')
const distCanvas = document.getElementById('dist')
const shuffleCanvas = document.getElementById('shuffle')

const noise = new CanvasHandle(noiseCanvas, 512, 512)
const dist = new CanvasHandle(distCanvas, 512, 512)
const _shuffle = new CanvasHandle(shuffleCanvas, 512, 512)

runButton.addEventListener('click', function () {
    noiseAndDist()
    fisherYates()
})

function noiseAndDist() {
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
}

function fisherYates() {
    const indices = Object.create(null)

    function p(arr, cur) {
        if (arr.length === 0) {
            indices['' + cur] = Object.keys(indices).length
            return
        }
        arr.forEach((value, index) => {
            const before = arr.slice(0, index)
            const after = arr.slice(index + 1)
            p(before.concat(after), cur.concat([value]))
        })
    }

    p([1, 2, 3, 4], [])

    const pcount = Object.keys(indices).length
    const results = Array(pcount).fill(0)
    const r = new Mulberry32(seedInput.value)
    const width = 512 / pcount

    for (let n = 0; n < 256 * pcount; ++n) {
        ++results[indices['' + shuffle(r, [1, 2, 3, 4])]]
    }

    _shuffle.con.fillStyle = 'rgb(255,255,255)'

    for (let n = 0; n < pcount; ++n) {
        _shuffle.con.fillRect(n * width + 0.5, 512 - results[n],
            width - 1, results[n])
    }
}
