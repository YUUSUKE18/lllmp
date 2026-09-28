const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  const countSteps = (n: number): number => {
    if (memo.has(n)) return memo.get(n) as number;
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
  };

  let total = 0;
  const lines = s.trim().split(/\r?\n/);
  for (const line of lines) {
    if (line === "") continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      const steps = countSteps(n);
      total += steps;
    }
  }

  console.log(`total=${total}`);
});
