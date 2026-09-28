const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  function solve(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    const step = 1 + solve(next);
    memo.set(n, step);
    return step;
  }
  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const num = parseInt(line.trim(), 10);
    if (Number.isNaN(num) || isNaN(num as any)) continue;
    if (!Number.isInteger(num) || num <= 0) continue;
    total += solve(num as number);
  }
  console.log(`total=${total}`);
});
