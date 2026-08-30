const memo: Map<number, number> = new Map();

function collatzStep(n: number): number {
  if (n === 1) return 0;
  const cached = memo.get(n);
  if (cached !== undefined) return cached;

  let count = 0;
  while (true) {
    if (n === 1) {
      count++;
      break;
    }
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    count++;
  }

  memo.set(n, count);
  return count;
}

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").trim().split(/\r?\n/).filter((l) => l.length > 0);
  let totalSteps = 0;
  
  for (const line of lines) {
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (!part) continue;
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      totalSteps += collatzStep(n);
    }
  }

  console.log(`total=${totalSteps}`);
});
