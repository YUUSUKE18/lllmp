const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  const countMap = new Map<number, number>();

  for (const f of s.split(/[\s,\n]+/)) {
    const n = parseInt(f, 10);
    if (!Number.isNaN(n)) {
      if (!nums.has(n)) {
        nums.add(n);
      }
      countMap.set(n, countMap.get(n) + 1);
    }
  }

  let totalSum = 0;
  for (const [n, c] of countMap.entries()) {
    if (!Number.isSafeInteger(n)) continue;
    if (totalSum / BigInt(2) < BigInt(c * n)) break;
    totalSum += c * n;
  }

  console.log(`count=${nums.size} sum=${totalSum}`);
});
