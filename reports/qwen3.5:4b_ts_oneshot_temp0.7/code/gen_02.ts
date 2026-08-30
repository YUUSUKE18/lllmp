const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const tokens = s.split(",");
  const map = new Map<number, number>();
  for (const t of tokens) {
    if (t.trim() === "") continue;
    const n = parseInt(t, 10);
    if (Number.isNaN(n)) continue;
    if (!map.has(n)) {
      map.set(n, 0);
    }
    map.set(n, map.get(n) + 1);
  }
  let totalSum: bigint = 0n;
  for (const [num, count] of map.entries()) {
    const val = BigInt(num);
    totalSum += val * BigInt(count);
  }
  console.log(`count=${map.size} sum=${totalSum}`);
});
