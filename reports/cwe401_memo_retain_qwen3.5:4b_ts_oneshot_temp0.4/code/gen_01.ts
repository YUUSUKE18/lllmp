const memo = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin._readData).toString("utf8");
  if (s.length === 0) return;
  const lines = s.split(/\r?\n/);
  let total = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;
    const count = getStepCount(n);
    total += count;
  }
  console.log(`total=${total}`);
});

function getStepCount(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  let steps = 1;
  let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  while (next !== 1) {
    steps++;
    if (memo.has(next)) {
      next = memo.get(next)!;
    } else {
      const isEven = next % 2 === 0;
      next = isEven ? next / 2 : 3 * next + 1;
    }
  }
  memo.set(n, steps);
  return steps;
}
