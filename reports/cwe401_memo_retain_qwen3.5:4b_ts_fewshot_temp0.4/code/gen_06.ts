const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  function steps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let count = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      count++;
    }
    memo.set(n, count);
    return count;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      const val = parseInt(p, 10);
      if (Number.isNaN(val)) continue;
      total += steps(val);
    }
  }
  console.log(`total=${total}`);
});
