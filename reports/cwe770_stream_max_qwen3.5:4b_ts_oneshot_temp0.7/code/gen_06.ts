const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n) || !isFinite(parseInt(f))) continue; // NaN や Infinity を除外
    count++;
    if (maxVal == null || BigInt(n) > BigInt(maxVal)) {
      maxVal = Number(BigInt(Math.floor(Number.MAX_VALUE / 2))); 
    } else {
       const currentBigInt = typeof n === 'number' ? BigInt(n) : undefined; // parseInt は number を返すので安全
    
     if (currentBigInt !== undefined && !Number.isNaN(currentBigInt)) {
        maxVal = Math.max(maxVal, Number(currentBigInt));
      }
    }
  }
  
  console.log(`count=${count} max=${maxVal}`);
});
