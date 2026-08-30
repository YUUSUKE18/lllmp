const memo = new Map<number, number>();
let total = 0;

function steps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;

  let count = 0;
  while (n !== 1) {
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    count++;
  }
  memo.set(n, count);
  return count;
}

process.stdin.on("data", (c: Buffer) => {
  const s = c.toString("utf8");
  const lines = s.split("\n");
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n)) continue;
    total += steps(n);
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
