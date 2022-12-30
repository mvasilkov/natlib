/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023 Mark Vasilkov
 */
'use strict'

/** Comparison function type */
export type CompareFunction<T> = (a: Readonly<T>, b: Readonly<T>) => number

/** Queue class that retrieves values in priority order (lowest first). */
export class PriorityQueue<T> {
    private values: (T | null)[]
    length: number
    readonly compareFn: CompareFunction<T>

    constructor(compareFn: CompareFunction<T>, initialValues?: readonly T[]) {
        this.values = []
        this.length = 0
        this.compareFn = compareFn

        initialValues?.forEach(value => this.put(value))
    }

    /** Put a value into the queue. */
    put(value: T) {
        this.values[this.length++] = value
        this.bubbleUp()
    }

    /** Remove and return the head of the queue. */
    get(): T | undefined {
        if (this.length === 0) return

        const head = this.values[0]!
        this.values[0] = this.values[--this.length]!
        this.values[this.length] = null

        if (this.length > 1) this.bubbleDown()

        return head
    }

    private bubbleUp() {
        let index = this.length - 1

        while (index !== 0) {
            const parent = index - 1 >>> 1

            if (this.compareFn(this.values[index]!, this.values[parent]!) < 0) {
                const t = this.values[index]!
                this.values[index] = this.values[parent]!
                this.values[index = parent] = t
            }
            else break
        }
    }

    private bubbleDown() {
        let index = 0

        while (true) {
            let target = index
            // Left child
            let child = 2 * index + 1
            if (child < this.length && this.compareFn(this.values[target]!, this.values[child]!) > 0) {
                target = child
            }
            // Right child
            ++child
            if (child < this.length && this.compareFn(this.values[target]!, this.values[child]!) > 0) {
                target = child
            }

            if (target !== index) {
                const t = this.values[index]!
                this.values[index] = this.values[target]!
                this.values[index = target] = t
            }
            else break
        }
    }
}

/** Return a new array containing values in ascending order. */
export function heapsort<T>(compareFn: CompareFunction<T>, values: readonly T[]): T[] {
    const queue = new PriorityQueue(compareFn, values)
    return Array.from(values, () => queue.get()!)
}
