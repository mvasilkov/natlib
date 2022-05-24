/*  Written in 2017 by Tommy Ettinger (tommy.ettinger@gmail.com)

To the extent possible under law, the author has dedicated all copyright
and related and neighboring rights to this software to the public domain
worldwide. This software is distributed without any warranty.

See <http://creativecommons.org/publicdomain/zero/1.0/>. */

#include <stdint.h>

/* This is a modified (stripped-down) fixed-increment version of Java 8's
   SplittableRandom generator, with significantly less "cipher-like" work
   done but with the parameters adjusted to fit the fixed increment well.
   Unlike SplitMix64, it does not have equal state size and output size,
   and the state is effectively 63 bits even though it outputs 64 bits.
   This means not all 64-bit results are possible. However, the speed of
   this generator is excellent, and it passes some arduous tests for
   statistical quality, such as gjrand's testunif, with "mcp --huge" giving
   this 0.853 for a total quality after passing 13/13 tests (1.0 is the max,
   0.1 or less is a failure; SplitMix64 fails some tests even when tested on
   1/100 the data). It goes beyond 4TB of test data on PractRand (this test
   takes about 12 hours and testing more data won't be reasonable, but
   SplitMix64 also passes this much of PractRand). It has not yet been
   tested on TestU01's BigCrush battery.

   SplitMix64 is documented at http://dx.doi.org/10.1145/2714064.2660195 and
   http://docs.oracle.com/javase/8/docs/api/java/util/SplittableRandom.html .
   This version is substantially different because the multiplier changes
   with every generated number (the multiplier is the next state, which is
   always odd). It should have a period of 2 to the 63, exactly, since the
   state changes to be each odd 64-bit unsigned integer before cycling.

   Testing on MinGW64 on Windows 7, with an i7-6700HQ quad-core mobile
   processor, it outperforms Xoroshiro128+, at 7.701 GB/s for Thrust vs.
   6.883 GB/s for Xoroshiro128+. This seems dependent on how well it is
   allowed to use the processor; on a virtual machine permitted two
   virtualized cores of the same processor, Thrust performed miserably
   compared to Xoroshiro128+, though it was roughly 1.5x faster than
   SplitMix64. It passes PractRand up to 4TB without failures. It passes
   BigCrush with a different constant, 0x6A5D39EAE116586A, but that constant
   has binary rank failures when tested with gjrand; since the currently-used
   constant, 0x6A5D39EAE12657AAULL, has better results all-around on both
   PractRand and gjrand, it should be safe to hope that the current constant
   will do well on BigCrush. Some constants of course do better than others on
   different seeds in the different testing batteries, so the current constant
   is likely to have some failures on some seeds.

   Thanks to Sebastiano Vigna, who helped find weak points in earlier
   iterations of the generator that led to the current version, and David John
   from the prng mailing list, who showed a weakness of an earlier constant
   using gjrand and got me testing with gjrand as well as PractRand.
 */

uint64_t x; /* The state can be seeded with any _odd_ value, so it's
               recommended that you run `x |= 1ULL` when setting the state with
	       arbitrary or user-entered data. */

/* Call next() to get 64 pseudo-random bits, call it again to get more bits. */
// It may help to make this inline, but you should see if it benefits your code.
uint64_t next(void) {
	const uint64_t s = x;
	const uint64_t z = (s ^ s >> 25) * (x += 0x6A5D39EAE12657AAULL);
	return z ^ (z >> 22);
}

/* The one constant currently used is intentionally even, and was found
   empirically by starting with a fixed-point 64-bit version of the golden
   ratio, rotating the bits until the number was even and there was a space
   of at least two adjacent 0 bits in the middle of the number (which seems
   important for the shifts), and then manually adjusting some of the bits
   while checking each change. The shifts seem to be extremely dependent on
   the exact constant chosen, and some of the time they seem to do well if,
   when applying the shifts to the constant, the bottom bit (LSB) is 1 with
   multiple 0 bits above it. If you have access to statistical tests for RNGs,
   you are encouraged to try other constants if you feel you can improve on
   the ones used, or have a theoretical foundation for a better choice.

   You can check the revision history on this Gist to see previous versions.
   This was changed to use a variable multiplier on October 19, 2017; that
   version passed PractRand but failed binary rank tests on gjrand (so does
   xoroshiro128+ and several other generators, though). To try to improve
   that behavior, the constant and shifts were changed on November 1, 2017,
   and now it passes all gjrand tests without failures while still passing
   PractRand up to 4TB.

   Versions before that can be seen in the revision history, but they don't
   seem to hold out against PractRand for very long at all, failing at 32GB
   on Gap-16 tests (many thanks to Sebastiano Vigna for spotting this). They
   use 64 bits of state and output 64 bits as well. The new version seems to
   be slightly faster and has higher quality as well.
 */
