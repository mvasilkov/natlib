# Changelog

## natlib 0.1.17 (?)

* ➕ Path tracing support

## natlib 0.1.16 (?)

* Change `Vec2.setPerpendicular()` to unary as God intended

## natlib 0.1.15 (2024-02-08)

* SAT collision solver friction support
* ➕ Static vertex class (Verlet integration)
* ➕ Exact constraint class (Verlet integration)
* ➕ Thrust 63-bit PRNG

## natlib 0.1.14 (2023-09-24)

* Correct the initial `phaseTtl` in `enterPhase()`
* Better `PositiveInteger` and `NonnegativeInteger` conditional types
* Change functions to fat arrows to save bytes

## natlib 0.1.13 (2023-06-27)

* ➕ Generate uniformly distributed points on the unit sphere: `uniformSampleSphere()`
* ➕ Interpolate the current phase progress: `interpolatePhase()`

## natlib 0.1.12 (2023-03-09)

* ➕ Print function for fixed-width bitmap fonts
* ➕ Phase and TTL functions: `enterPhase()`, `updatePhase()`
* Change `ShortBool` to an enum of `{ FALSE, TRUE }`. Use `ExtendedBool` as a boolean type.

## natlib 0.1.11 (2023-02-18)

* ➕ Functions for decoding bitmaps stored as [BigInt values][eebe-bigint] or [arrays of integers][eebe]: `decodeBitmap` and `decodeBitmapBigInt`
* The `A*` loop no longer ends depending on the return value of `WalkFunction`
* Pointer constructor's argument doesn't have to be `<canvas>`

[eebe]: https://mvasilkov.animuchan.net/ecmascript-embedded-bitmap-encoding
[eebe-bigint]: https://mvasilkov.animuchan.net/bigint-embedded-bitmap-encoding

## natlib 0.1.10 (2023-02-02)

* ➕ `A*` path finding on a square grid
* ➕ Scanline flood fill
* ➕ Type assertions: `PositiveInteger`, `NonnegativeInteger`
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
