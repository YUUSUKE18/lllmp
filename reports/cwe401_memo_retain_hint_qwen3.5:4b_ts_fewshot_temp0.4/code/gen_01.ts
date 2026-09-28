const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  memo.set(1, 0);

  function steps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let count = 0;
    while (n !== 1) {
      n = n % 2 === 0 ? n / 2 : 3 * n + 1;
      count++;
    }
    memo.set(n, count);
    return count;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      total += steps(n);
    }
  }

  console.log(`total=${total}`);
});
