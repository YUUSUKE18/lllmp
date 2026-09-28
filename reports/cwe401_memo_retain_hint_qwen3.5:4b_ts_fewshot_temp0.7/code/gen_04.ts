const memo = new Map<number, number>();

function solve(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;

  const nextVal = (n % 2 === 0) ? n / 2 : 3 * n + 1;
  const steps = 1 + solve(nextVal);
  memo.set(n, steps);
  return steps;
}

const data: string[] = [];
process.stdin.on("data", (c) => data.push(c.toString()));
process.stdin.on("end", () => {
  let total = 0;
  for (const line of data.flatMap(s => s.split("\n"))) {
    const trimmed = line.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) continue;
    const val = parseInt(trimmed, 10);
    if (isNaN(val)) continue;
    total += solve(val);
  }
  console.log(`total=${total}`);
});
