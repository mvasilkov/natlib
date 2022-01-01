/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2021 Mark Vasilkov
 */
'use strict'

import type { uint32_t } from '../prelude'
import type { CanvasHandle } from '../canvas/CanvasHandle'
import { Mulberry32 } from '../prng/Mulberry32.js'
import { shuffle } from '../prng/functions.js'

const prngClassMap = {
    Mulberry32,
}

type PrngId = keyof typeof prngClassMap

export function noiseAndDist(prngId: PrngId, seed: uint32_t,
    noiseCanvas: CanvasHandle, distCanvas: CanvasHandle) {

    const r = new prngClassMap[prngId](seed)
    const d = Array(distCanvas.width).fill(0)

    function* getBytes() {
        while (true) {
            const n = r.randomUint32()

            ++d[n % distCanvas.width]

            yield n & 255
            yield (n >>> 8) & 255
            yield (n >>> 16) & 255
            yield (n >>> 24) & 255
        }
    }

    const bytes = getBytes()

    noiseCanvas.con.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height)

    for (let y = 0; y < noiseCanvas.height; ++y) {
        for (let x = 0; x < noiseCanvas.width; ++x) {
            const b = bytes.next().value

            noiseCanvas.con.fillStyle = `rgb(${b},${b},${b})`
            noiseCanvas.con.fillRect(x, y, 1, 1)
        }
    }

    /* More samples for distribution */
    for (let n = 0; n < noiseCanvas.height * noiseCanvas.width; ++n) {
        bytes.next()
    }

    distCanvas.con.clearRect(0, 0, distCanvas.width, distCanvas.height)

    distCanvas.con.fillStyle = 'rgb(255,255,255)'

    for (let x = 0; x < distCanvas.width; ++x) {
        distCanvas.con.fillRect(x, distCanvas.height - d[x], 1, d[x])
    }
}

export function fisherYates(prngId: PrngId, seed: uint32_t,
    shuffleCanvas: CanvasHandle) {

    const indices: { [p: string]: number } = Object.create(null)

    function p(arr: number[], cur: number[]) {
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
    const results: number[] = Array(pcount).fill(0)
    const r = new prngClassMap[prngId](seed)
    const width = shuffleCanvas.width / pcount
    const padding = 1 / (pcount - 1)

    for (let n = 0; n < 0.5 * shuffleCanvas.height * pcount; ++n) {
        ++results[indices['' + shuffle(r, [1, 2, 3, 4])]!]
    }

    shuffleCanvas.con.clearRect(0, 0, shuffleCanvas.width, shuffleCanvas.height)

    shuffleCanvas.con.fillStyle = 'rgb(255,255,255)'

    for (let n = 0; n < pcount; ++n) {
        shuffleCanvas.con.fillRect(n * (width + padding),
            shuffleCanvas.height - results[n]!, width - 1, results[n]!)
    }
}
