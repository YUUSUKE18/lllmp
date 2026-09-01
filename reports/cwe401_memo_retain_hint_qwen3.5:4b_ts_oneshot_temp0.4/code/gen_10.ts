const memo = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin._readData).toString("utf8");
  const lines = s.split(/\r?\n/);
  let total = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    total += collatzSteps(n);
  }
  console.log(`total=${total}`);
});

function collatzSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  let steps = 0;
  let current = n;
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
    if (!memo.has(current)) memo.set(current, 0);
  }
  return memo.get(n)!;
}
