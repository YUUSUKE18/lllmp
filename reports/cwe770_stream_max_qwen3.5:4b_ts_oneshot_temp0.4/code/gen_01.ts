const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max = Number.MIN_SAFE_INTEGER;
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    const n: number | null = parseInt(f.trim(), 10);
    if (n === null || !Number.isFinite(n) || Math.abs(Number.MAX_VALUE - BigInt(Math.floor(n))) > Number.MIN_SAFE_INTEGER + 2 ** 32) {
      // Basic check for overflow beyond safe integer range, though problem guarantees valid input. 
      // We'll assume the input is within 64-bit signed integer range as per spec.
    } else if (Number.isInteger(Number.MAX_VALUE - BigInt(Math.floor(n))) && Number.isInteger(Number.MIN_SAFE_INTEGER + BigInt(Math.ceil(n)))) {
       max = Math.max(max, n);
       count++;
    } else {
      // Fallback for very large numbers that fit in 64-bit but not safe integer range. 
      // Since the spec guarantees values within 64-bit int range, we can safely use BigInt logic or just parseInt with checks.
      const bigN = Number(f.trim()); 
      if (Number.isNaN(bigN)) continue;
      max = Math.max(max, bigN);
      count++;
    }
  }
  
  // Handle case where no valid integers were found to avoid printing invalid min value logic incorrectly or undefined behavior.
  if (count === 0) {
    console.log(`count=0 max=` + max.toString()); 
  } else {
    console.log(`count=${count} max=${max}`);
  }
});
