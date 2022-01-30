# natlib

Natural Motion Library for Game Development

## Motivation

I love the idea of having a lightweight, highly modular foundation for small games.

The development of natlib is guided by the following principles:

* Make a library, not a framework.
* Find the right balance between size, performance and readability.
* Prefer loose coupling to prevent the Banana Monkey Jungle problem.

## Codemap

```
.
├── examples
└── typescript
    ├── Vec2.ts                     # 2D vector class
    ├── Vec3.ts                     # 3D vector class
    ├── canvas                      # Utilities related to canvas
    ├── interpolation.ts            # Interpolation functions
    ├── noise
    │   └── PerlinNoise.ts          # Perlin noise class
    ├── prng
    │   ├── Mulberry32.ts           # Mulberry32 PRNG class
    │   └── sampling.ts             # Pseudorandom sampling functions
    └── verlet                      # Verlet integration
        └── collision.ts            # SAT collision detection
```

## Acknowledgements

## License

Except where otherwise noted, the natlib source code is licensed under the MIT License.

The examples are licensed under the [MIT+Ethics License][ethics-license]; see the LICENSE file in that directory.

[ethics-license]: https://github.com/mvasilkov/natlib/blob/master/examples/LICENSE
