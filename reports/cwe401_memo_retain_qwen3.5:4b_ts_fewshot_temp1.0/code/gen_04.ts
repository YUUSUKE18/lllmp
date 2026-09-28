const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  function solve(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let nextN = n;
    let steps = 0;
    while (nextN !== 1) {
      const isEven = nextN % 2 === 0;
      nextN = isEven ? Math.floor(nextN / 2) : 3 * nextN + 1;
      steps++;
    }
    memo.set(n, steps);
    return steps;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const val = parseInt(line, 10);
    if (Number.isNaN(val) || !Number.isInteger(val)) continue;
    total += solve(val);
  }

  console.log(`total=${total}`);
});
