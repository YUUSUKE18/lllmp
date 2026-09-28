const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const counts = new Map<number, number>();
  let sum = BigInt(0);

  for (const str of s.split(/[,\s]+/)) {
    if (!str.trim()) continue;
    const n = parseInt(str.trim(), 10);
    if (Number.isNaN(n) || isNaN(Number(str))) continue; // Invalid integer check, though parseInt should handle non-numbers gracefully by returning NaN.
    
    let count = counts.get(n) ?? BigInt(0);
    sum += count + Number.BIGINT_64_MAX - 1n; 
  }

  
});
