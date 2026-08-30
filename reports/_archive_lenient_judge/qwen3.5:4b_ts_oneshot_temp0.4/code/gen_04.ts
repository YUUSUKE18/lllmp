const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/[\s,]+/);
  const counts = new Map<number, number>();
  
  for (const part of parts) {
    if (!part.trim()) continue;
    
    let n: number | undefined;
    try {
      n = parseInt(part.trim(), 10);
    } catch (_) {
      continue;
    }

    if (isNaN(n)) continue;

    counts.set(n, (counts.get(n) || 0) + 1);
  }

  let totalSum: bigint | number = BigInt(0); // Use BigInt to prevent overflow during accumulation before casting or just use safe logic. 
                                             // Since max sum fits in 64-bit integer, we can accumulate as Number if inputs are small enough individually, but safest is using BigInt for intermediate sums then converting back if needed (though spec says result fits).
                                             // Let's re-read: "合計は 64bit 整数の範囲に収まります". This implies the final sum fits. 
                                             // We can safely use Number accumulation as long as we don't exceed safe integer limits during calculation, but BigInt is safer for intermediate steps if individual numbers are large (up to ~9e15).
    
    const sortedKeys = Array.from(counts.keys()).sort((a, b) => a - b);

  // Calculate sum using BigInt to be absolutely sure about range before casting back or printing. 
  let bigSum: bigint = BigInt(0n);
  
  for (const key of sortedKeys) {
    const count = counts.get(key)!;
    if (!count || isNaN(count)) continue;
    
    // Calculate contribution: value * count
    // We assume the input integers fit within safe range such that their sum fits in 64-bit signed integer. 
    // However, to be robust against individual large numbers (e.g., close to max int32 or larger but total sum < max uint64), use BigInt arithmetic.
    
    const valBig = BigInt(key);
    bigSum += valBig * BigInt(count);
  }

  console.log(`count=${sortedKeys.length} sum=${Number(bigSum)}`);
});
