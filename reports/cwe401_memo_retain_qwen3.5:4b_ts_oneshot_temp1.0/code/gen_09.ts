const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function collatz(n: number): number {
    if (memo.has(n)) return memo.get(n) as number;
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      steps++;
    }
    memo.set(n, steps);
    return steps;
  }

  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (!/\d+-?/.test(part)) continue;
      try {
        const n = parseInt(part, 10);
        total += collatz(n);
      } catch {
        // 無視
      }
    }
  }

  console.log(`total=${total}`);
});
