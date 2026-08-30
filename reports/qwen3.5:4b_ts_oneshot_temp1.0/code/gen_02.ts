const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const tokens = s.split(/[\s,]+/);
  const counts = new Map<number, number>();

  for (const token of tokens) {
    if (!token.trim()) continue;
    const n = parseInt(token.trim(), 10);
    if (Number.isNaN(n)) continue;
    
    let count = counts.get(n);
    if (count === undefined) {
      count = 1;
    } else {
      count++;
    }
    counts.set(n, count);
  }

  const sumMap = new Map<number, number>();
  for (const [n, cnt] of counts.entries()) {
    let s = sumMap.get(n);
    if (s === undefined) {
      s = n * cnt;
    } else {
      s += n * cnt;
    }
    sumMap.set(n, s);
  }

  const totalCount = counts.size;
  const totalSum = Array.from(sumMap.values()).reduce((a, b) => a + b, 0n) as bigint; // Using BigInt for safety though spec says fits in 64-bit

  console.log(`count=${totalCount} sum=${totalSum}`);
});
