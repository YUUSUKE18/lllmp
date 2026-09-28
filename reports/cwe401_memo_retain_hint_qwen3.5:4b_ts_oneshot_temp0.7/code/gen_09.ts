const memo = new Map<number, number>();
let total = 0;

function solve(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  
  let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const steps = 1 + solve(next);
  memo.set(n, steps);
  return steps;
}

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      total += solve(n);
    }
  }
  
  console.log(`total=${total}`);
});
