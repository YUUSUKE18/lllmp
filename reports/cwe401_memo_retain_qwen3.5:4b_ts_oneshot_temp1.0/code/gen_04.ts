const memo = new Map<number, number>();
function collatzStep(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  let steps = 1;
  while (n !== 1) {
    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
    steps++;
  }
  memo.set(n, steps);
  return steps;
}

process.stdin.on("data", (chunk: Buffer) => {
  const input = chunk.toString("utf8");
  const lines = input.split(/\r\n|\n/).filter(line => line.trim().length > 0);
  let totalSteps = 0;
  for (const line of lines) {
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (/\D/.test(part)) continue;
      const n = parseInt(part, 10);
      if (!Number.isFinite(n)) continue;
      totalSteps += collatzStep(n);
    }
  }
  console.log(`total=${totalSteps}`);
});
