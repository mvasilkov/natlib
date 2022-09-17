/* This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * MIT License | Copyright (c) 2022 Mark Vasilkov
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

        if (initialValues) {
            for (const value of initialValues) {
                this.put(value)
            }
        }
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
        }
    }

    private bubbleDown() {
    }
}
