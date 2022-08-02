/*  Written in 2017 by Tommy Ettinger (tommy.ettinger@gmail.com)

To the extent possible under law, the author has dedicated all copyright
and related and neighboring rights to this software to the public domain
worldwide. This software is distributed without any warranty.

See <http://creativecommons.org/publicdomain/zero/1.0/>. */

#include <stdint.h>

/* This is a 32-bit variant on the 63-bit Thrust PRNG, adapted for possible
   usage in embedded hardware with 32-bit registers because TonyB on the prng
   mailing list seemed like he could use this. Thrust is still in development,
   mainly at another Gist ( https://gist.github.com/tommyettinger/e6d3e8816da79b45bfe582384c2fe14a ).
   Mulberry uses a few multiplications compounded on the last result, much like
   how a mulberry is a compound fruit, to help improve quality beyond what the
   tiny state normally allows. It should have a period of 2 to the 32, exactly,
   since the state changes to be each 32-bit unsigned integer before cycling.

   The speed of this generator hasn't even been tested, and is probably less
   than desirable on a 64-bit desktop processor, but it's meant for 32-bit
   hardware. It passes gjrand's 13 tests with no failures and a total P-value
   of 0.984 (where 1 is perfect and 0.1 or less is a failure) on 4GB of
   generated data. That's a quarter of the full period. On the same amount, the
   comparable SplitMix32 generator has a total P-value of 0, and had multiple
   failures of extreme significance; these were two rank 1 minor failures but
   also two more at rank 20 and rank 21, each an irredeemable failure on its
   own. Testing on the full period (2 to the 32 numbers with 4 bytes each, for
   a total of 16GB of data), Mulberry32 still does very well (for a generator
   with 32 bits of state) with total P = 0.753 and all 13 tests passed. Since
   SplitMix32 had failed beyond any hope of improvement at a small size, to
   compare I tried SplitMix64, with 64 bits of state and generating 64 bits at
   a time. On 4GB of data, SplitMix64's total P-value is 0.494, and it has two
   rank 1 failures. On 16GB of data, SplitMix64's total P-value is 0.396, and
   it has 1 rank 1 failure. To compare what is possible at that state size, a
   variant on Thrust with 64 bits of state and 64 bit output passes 13 of 13
   tests and gets a P-value of 0.91 when testing on 4GB of data, and a P-value
   of 0.857 while still passing all tests on 16GB of data. Both SplitMix64 and
   the 64-bit Thrust variant use fewer operations than Mulberry32 to obtain each
   result (and that result is twice the size); if you can use a PRNG that works
   with 64-bit math, you generally will benefit.
 */

uint32_t x; /* The state can be seeded with any value. */

/* Call next() to get 32 pseudo-random bits, call it again to get more bits. */
// It may help to make this inline, but you should see if it benefits your code.
uint32_t next(void) {
  uint32_t z = (x += 0x6D2B79F5UL);
  z = (z ^ (z >> 15)) * (z | 1UL);
  z ^= z + (z ^ (z >> 7)) * (z | 61UL);
  return z ^ (z >> 14);
}

/* The one large constant, 0x6D2B79F5UL, is tightly linked to the shift amounts
   used later in the code. It is probably a bad idea to change the constant without
   verifying that the quality is still OK in a robust testing suite like gjrand or
   maybe TestU01's BigCrush (this may be unable to pass BigCrush simply because its
   state size is too small). This constant was found by repeatedly editing the
   constant used by Thrust in a 64-bit version (which in turn was found by shifting
   the constant used for Thrust in its 63-bit version, and changing the lowest and
   highest few bits), adjusting the shift amounts to match specific patterns that
   could occur (or be edited into) the constant. That on its own didn't prove
   enough, so a bitwise or with 61 was tried (along with other, smaller numbers; 29
   was used in an earlier version), and in conjunction with the add-to-product-then-
   xor step, that seems to do the trick and yield high quality for the state size.
   The constant was changed between the first and second versions, but only a few
   bits actually changed and the shifts were all fine where they were. One of the
   bitwise OR values did change, which proved key to bringing the 16GB test to a
   point where it has no failures.
 */
