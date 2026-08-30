const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function getSteps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    if (n % 2 === 0) {
      const nextN = n / 2;
      const steps = 1 + getSteps(nextN);
      memo.set(n, steps);
      return steps;
    } else {
      const nextN = 3 * n + 1;
      const steps = 1 + getSteps(nextN);
      memo.set(n, steps);
      return steps;
    }
  }

  for (const line of s.split(/\r?\n/)) {
    if (!line || !/^-?\d+$/.test(line.trim())) continue;
    
    const parts = line.split(/\s+/);
    let n: number | undefined;
    for (const p of parts) {
      const parsed = parseInt(p, 10);
      if (!isNaN(parsed)) {
        n = parsed;
        break;
      }
    }

    if (n !== undefined && n > 0) {
      total += getSteps(n);
    }
  }

  console.log(`total=${total}`);
});
