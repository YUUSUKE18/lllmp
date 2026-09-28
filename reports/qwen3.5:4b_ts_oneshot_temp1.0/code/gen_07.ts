const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/[\s,]+/);
  const nums = new Map<number, number>();

  for (const p of parts) {
    if (!p.trim()) continue;
    const n = parseInt(p.trim(), 10);
    if (Number.isNaN(n)) continue;
    nums.set(n, (nums.get(n) || 0) + 1);
  }

  let totalSum = 0n;
  for (const [num, count] of nums.entries()) {
    totalSum += BigInt(num) * BigInt(count);
  }

  console.log(`count=${nums.size} sum=${Number(totalSum)}`);
});
