const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: bigint | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = BigInt(token);
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
      count++;
    } catch (_) {} // 整数として解釈できない場合は無視する

  }
  
  console.log(`count=${count} ${maxVal !== null ? `max=${maxVal}` : "max=0"}`);
});
