const mem = new Map<number, number>();

function collatz(n: number): number {
  if (mem.has(n)) return mem.get(n);
  if (n === 1) return 0;
  if (n % 2 === 0) return mem.set(n, 1 + collatz(n / 2)) || 0;
  return mem.set(n, 1 + collatz(3 * n + 1)) || 0;
}

let total = 0;

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).filter(Number.isFinite);
  for (const n of numbers) {
    total += collatz(parseInt(n, 10));
  }
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
