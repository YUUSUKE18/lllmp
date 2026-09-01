const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);
  let total = 0;
  
  const steps = (n: number): number => {
    if (memo.has(n)) return memo.get(n)!;
    
    let current = n;
    let count = 0;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = Math.floor(current / 2);
      } else {
        // Use BigInt for calculation to prevent overflow before converting back, 
        // though the problem guarantees it fits in 64-bit integer range.
        // We perform the operation on BigInt, then cast to number if needed or just use BigInt logic carefully.
        // However, since intermediate values fit in 64-bit (Number in JS is safe up to 2^53 precision, 
        // but max value for 3n+1 cycle often exceeds Number.MAX_SAFE_INTEGER, so we should use BigInt for safety).
        // The problem states "intermediate values... fit within 64-bit integer range", 
        // which is safe for JS BigInt.
        const nextVal = (BigInt(current) * 3N + 1N);
        current = Number(nextVal); // Safe based on spec
      }
      count++;
    }
    
    memo.set(n, count);
    return count;
  };

  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.trim().split(/\s+/).filter(p => p !== "");
    for (const part of parts) {
      try {
        const n = parseInt(part, 10);
        if (!Number.isNaN(n)) {
          total += steps(n);
        }
      } catch (_) {
        // Ignore lines that cannot be interpreted as integers
      }
    }
  }

  console.log(`total=${total}`);
});
