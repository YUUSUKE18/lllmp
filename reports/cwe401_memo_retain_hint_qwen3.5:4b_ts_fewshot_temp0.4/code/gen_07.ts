const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  function collatzStep(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    
    let next: number;
    if (n % 2 === 0) {
      next = n / 2;
    } else {
      next = 3 * n + 1;
    }

    const steps = 1 + collatzStep(next);
    memo.set(n, steps);
    return steps;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n) || n < 1) continue;
    
    // 64bit integer check: JavaScript BigInt is used for safety during intermediate steps 
    // though the problem states 32-bit fits, but 3n+1 can exceed 2^31-1.
    // We use BigInt for calculation to avoid overflow before converting back if needed,
    // but since we need to memoize and return number of steps, and inputs are within 32-bit range,
    // the intermediate values fit in 64-bit (BigInt).
    
    const nBig = BigInt(n);
    let current: bigint = nBig;
    let stepsForN = 0;
    
    while (current !== 1n) {
      if (current % 2n === 0n) {
        current = current / 2n;
      } else {
        current = 3 * current + 1n;
      }
      stepsForN++;
    }
    
    // If the sequence goes beyond safe integer range for direct BigInt operations that we might want to cache as numbers,
    // but since inputs are <= 2^31-1, and Collatz conjecture holds within reasonable bounds for competitive programming contexts,
    // we can convert back. However, intermediate values can be large.
    // Let's use the memoization properly with BigInt keys if necessary, or just numbers if they fit.
    // The problem says "32bit integer range" for inputs and intermediates fit in 64bit.
    // So we can store BigInts in map.
    
    const steps = stepsForN;
    total += steps;
    
    // Cache the result for the starting number n (as a number)
    // We don't cache intermediate values as numbers because they might exceed 53 bits precision of JS Number,
    // but we can cache them as BigInts if needed. However, to keep it simple and efficient:
    // Since inputs are small enough, let's just compute directly per query unless there's overlap in the start.
    // But wait, the problem says "calculate results with memoization".
    // So we should cache intermediate values too.
    
    // Let's re-implement with full memoization using BigInt keys for safety.
  }

  // Re-doing logic with proper memoization using BigInt keys
  const memoBig = new Map<bigint, number>();
  memoBig.set(1n, 0);

  function getSteps(n: bigint): number {
    if (memoBig.has(n)) return memoBig.get(n)!;
    
    let next: bigint;
    if (n % 2n === 0n) {
      next = n / 2n;
    } else {
      next = 3 * n + 1n;
    }

    const steps = 1 + getSteps(next);
    memoBig.set(n, steps);
    return steps;
  }

  total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n) || n < 1) continue;
    
    const nBig = BigInt(n);
    const steps = getSteps(nBig);
    total += steps;
  }

  console.log(`total=${total}`);
});
