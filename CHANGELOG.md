# Changelog

## natlib 0.1.10 (?)

* ➕ `A*` path finding on a square grid
* ➕ Sliding window function
* ➕ Permutations function
* Further size optimizations

## natlib 0.1.9 (2023-01-18)

* ➕ Audio handle class
* ➕ Functions for converting to and from decibels
* ➕ Debounce function
* Cut the workaround for `visualViewport` theoretically returning `null`

## natlib 0.1.8 (2023-01-03)

* Account for `visualViewport` returning `null` if the document is not fully active.
* Better coding: use optional chaining, annotate `new Vec2` with `@__PURE__`

## natlib 0.1.7 (2022-12-12)

* ➕ SAT collision detection and resolution
* ➕ Scene pointer controls (Verlet integration)
* ➕ 3D Perlin noise

## natlib 0.1.6 (2022-11-26)

* ➕ Verlet integration
* ➕ Compact Boolean type, `ShortBool`

## natlib 0.1.5 (2022-11-06)

* ➕ Keyboard controls class
* ➕ 32-bit PRNG: SplitMix32

## natlib 0.1.4 (2022-10-05)

* ➕ Easing functions
* Allow passing `number` to `setTextStyle()`

## natlib 0.1.3 (2022-09-26)

* ➕ Canvas text functions: `setTextStyle()` and `textCapsule()`
* ➕ Digital differential analyzer (DDA)

## natlib 0.1.2 (2022-09-17)

* ➕ Priority queue class
* `CanvasHandle` accepts supersampling factor (previously it depended on `devicePixelRatio`)
* Use `Math.hypot()` for vector length

## natlib 0.1.1 (2022-09-10)

* Allow passing `document` to `Pointer.addEventListeners()`
* `CanvasHandle` creates a `<canvas>` if passed `null`

## natlib 0.1.0 (2022-08-08)

* Initial public release
