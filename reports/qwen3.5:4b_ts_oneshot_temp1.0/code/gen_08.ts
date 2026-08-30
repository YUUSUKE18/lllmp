const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let currentSum = 0;
  const map = new Map<number, number>();
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f.trim(), 10);
      if (Number.isNaN(n) || !Number.isFinite(n)) continue;
      
      if (map.has(n)) {
        currentSum += map.get(n)!;
      } else {
        map.set(n, 1);
      }
    } catch (_) {}
  }
  
  let totalCount = 0;
  for (const [, count] of map.entries()) {
    totalCount += count;
  }
  
  console.log(`count=${totalCount} sum=${currentSum}`);
});
