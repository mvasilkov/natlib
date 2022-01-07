# natlib

Natural Motion Library for Game Development

## Motivation

## Codemap

```
.
├── examples
└── typescript
    ├── Vec2.ts                     # 2D vector class
    ├── Vec3.ts                     # 3D vector class
    ├── canvas
    │   └── CanvasHandle.ts         # Canvas handle class
    ├── interpolation.ts            # Interpolation functions
    ├── noise
    │   └── PerlinNoise.ts          # Perlin noise class
    ├── prelude.ts                  # Standard types
    ├── prng
    │   ├── Mulberry32.ts           # Mulberry32 PRNG class
    │   ├── functions.ts            # PRNG helper functions
    │   └── sampling.ts             # Pseudorandom sampling functions
    └── verlet
```

## License

Except where otherwise noted, the natlib source code is licensed under the MIT License.

The examples are licensed under the [MIT+Ethics License][ethics-license]; see the LICENSE file in that directory.

[ethics-license]: https://github.com/mvasilkov/natlib/blob/master/examples/LICENSE
