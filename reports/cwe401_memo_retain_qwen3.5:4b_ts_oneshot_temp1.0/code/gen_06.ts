const memo: Map<number, number> = new Map();
function step(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const cost = 1 + step(next);
  memo.set(n, cost);
  return cost;
}

const input: string[] = [];
process.stdin.on("data", (c: Buffer) => {
  input.push(c.toString());
});
process.stdin.on("end", () => {
  const total = 0;
  for (const line of input) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    const n64 = Number(n);
    total += step(Math.floor(n64));
  }
  console.log(`total=${total}`);
});
