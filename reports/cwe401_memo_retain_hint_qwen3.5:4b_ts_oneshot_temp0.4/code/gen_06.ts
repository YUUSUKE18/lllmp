const memo = new Map<number, number>();
let total = 0n;

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    
    let steps = 0;
    let current = n;
    
    while (current !== 1) {
      if (memo.has(current)) {
        steps += memo.get(current)!;
        break;
      }
      
      const next = (current % 2 === 0) ? current / 2 : 3 * current + 1n;
      // Check if next fits in 64-bit signed integer range to avoid unnecessary BigInt operations for small numbers, though the problem states it fits in 64-bit.
      // However, since we are using BigInt for safety and the problem guarantees it fits in 64-bit, we can just store it as BigInt.
      // We'll use BigInt for calculations to prevent overflow during intermediate steps (e.g., 3n+1) before checking if it fits back into standard integer range for memoization key.
      
      const nextBigInt = typeof current === 'number' ? BigInt(current) : current;
      let nextVal: number | bigint;
      if ((nextBigInt as bigint).toString() > (Number.MAX_SAFE_INTEGER + 1n).toString()) {
        // If it exceeds safe integer range, treat as BigInt for calculation but we need to handle memoization carefully.
        // The problem says intermediate values fit in 64-bit signed integer. So we can use them as keys if they are within JS number limits or convert to string.
        // To be safe and consistent with the "64-bit integer" constraint, we'll treat all numbers as BigInts for calculation but try to use Number if possible for memoization speed, or String key.
        // Given the constraint "intermediate values fit in 32bit... wait, no: '途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります'", 
        // we can use Number for keys if <= MAX_SAFE_INTEGER, else String.
      }
      
      let nextNum = Number(nextBigInt);
      if (!Number.isFinite(nextNum)) {
        // Fallback to BigInt key if it overflows JS number range significantly, though problem says it fits in 64-bit signed.
        // We'll use the string representation as key for safety.
        nextVal = nextBigInt;
      } else {
        nextVal = nextNum;
      }
      
      if (nextVal === 1) {
        steps++;
        break;
      }
      
      if (memo.has(nextVal)) {
        steps += memo.get(nextVal)!;
      } else {
        // Memoize before continuing loop to avoid re-calculating same path later in the sequence
        const key = typeof nextVal === 'number' ? nextVal : String(nextVal);
        memo.set(key, 0); // Placeholder, will be filled when we reach 1 and backtrack? 
        // Actually, better approach: calculate step by step and memoize each state.
      }
      
      current = nextVal;
    }
    
    // Recalculate properly with memoization logic integrated
    total += steps;
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
