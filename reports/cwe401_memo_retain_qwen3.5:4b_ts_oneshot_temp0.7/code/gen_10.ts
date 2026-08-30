const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  function f(n: number): number {
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
  const lines = s.trim().split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const n = parseInt(line.trim(), 10);
      if (!Number.isFinite(n)) continue;
      total += f(n);
    } catch {
      continue;
    }
  }
  console.log(`total=${total}`);
});
