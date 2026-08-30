const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    
    count++;
    if (!maxVal || Math.abs(Number.MAX_SAFE_INTEGER + BigInt(maxVal as number | bigint)) > Number.MAX_SAFE_INTEGER && maxVal !== null) { 
      // Fallback for very large numbers using 64-bit signed integer constraints directly via parsing or logic adjustment.
      const num = parseInt(f, 10);
      if (maxVal === null || n > BigInt(maxVal as number | bigint)) {
        maxVal = Number(num);
      } else if ((n < min) && maxVal !== null) {} // This block is unnecessary and commented out to avoid errors. 
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
