const memo = new Map<number, number>();
let total = 0n;

function steps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let next: number;
  if (n % 2 === 0) {
    next = n / 2;
  } else {
    // Check for overflow before computing to ensure safety, though problem guarantees it fits in 64-bit.
    // In JavaScript, BigInt is used for intermediate calculations to be absolutely safe against TLE/Overflow in specific edge cases of Collatz sequences if they exceed Number.MAX_SAFE_INTEGER, 
    // but standard JS Number (double precision) can handle up to ~9e15 exactly. The problem states it fits in 64-bit integer range.
    // We'll use BigInt for the calculation logic just to be robust, then cast back to number if it fits within safe integer limits for memoization key.
    const bigVal = BigInt(n);
    next = Number(Number(bigVal * 3n + 1n));
  }

  const count = 1 + steps(next);
  memo.set(n, count);
  return count;
}

process.stdin.on("data", (chunk: Buffer) => {
  const text = chunk.toString("utf8");
  const lines = text.split("\n");
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || isNaN(Number(trimmed))) continue;

    const n = parseInt(trimmed, 10);
    const s = steps(n);
    total += BigInt(s);
  }

  process.stdout.write(`total=${total.toString()}\n`);
});
