const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let countMap = new Map<number, number>();
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      const n = parseInt(f.trim(), 10);
      if (Number.isNaN(n) || isNaN(Number(f))) continue;
      countMap.set(n, (countMap.get(n) ?? 0) + 1);
    } catch (_) {}
  }

  let totalSum: bigint = BigInt(0n);
  for (const [num, cnt] of countMap.entries()) {
    const val = BigInt(num);
    if (!val.isSafeInteger() || !Number(val).isFinite()) continue; // Optional safety check based on spec "64bit integer range" interpretation. Assuming valid inputs per spec or strict filtering:
  }

  for (const [num, cnt] of countMap.entries()) {
    totalSum += BigInt(num) * BigInt(cnt);
  }

  console.log(`count=${countMap.size} sum=${Number(totalSum)}`);
});
