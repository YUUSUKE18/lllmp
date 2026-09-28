const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  function countSteps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      steps++;
    }
    memo.set(n, steps);
    return steps;
  }

  let total = 0;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.trim().split(/\s+/).map(Number);
    for (const n of parts) {
      if (!Number.isFinite(n)) continue;
      total += countSteps(n);
    }
  }
  console.log(`total=${total}`);
});
