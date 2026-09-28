const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let nextVal = n % 2 === 0 ? n / 2 : 3 * n + 1;
    const cost = 1 + steps(nextVal);
    memo.set(n, cost);
    return cost;
  }

  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      const num = parseInt(p, 10);
      if (Number.isNaN(num)) continue;
      total += steps(num);
    }
  }

  console.log(`total=${total}`);
});
