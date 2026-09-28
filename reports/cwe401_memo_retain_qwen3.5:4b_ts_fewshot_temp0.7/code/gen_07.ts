const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<string, number>();
  let total = 0;

  function solve(n: number): number {
    if (n === 1) return 0;
    if (memo.has(String(n))) return memo.get(String(n))!;

    const nextN = n % 2 === 0 ? n / 2 : 3 * n + 1;
    const steps = 1 + solve(nextN);
    memo.set(String(n), steps);
    return steps;
  }

  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n)) continue;
    total += solve(n);
  }

  console.log(`total=${total}`);
});
