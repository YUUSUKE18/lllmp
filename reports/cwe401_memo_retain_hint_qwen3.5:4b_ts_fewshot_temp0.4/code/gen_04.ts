const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  let total = 0;

  function solve(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    if (n === 1) {
      memo.set(n, 0);
      return 0;
    }
    let next: number;
    if (n % 2 === 0) {
      next = n / 2;
    } else {
      next = 3 * n + 1;
    }
    const steps = 1 + solve(next);
    memo.set(n, steps);
    return steps;
  }

  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      const n = parseInt(p, 10);
      if (Number.isNaN(n)) continue;
      total += solve(n);
    }
  }

  console.log(`total=${total}`);
});
