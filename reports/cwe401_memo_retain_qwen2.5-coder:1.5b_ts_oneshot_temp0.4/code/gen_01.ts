function collatzSteps(n: number): number {
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + collatzSteps(n / 2);
  return 1 + collatzSteps(3 * n + 1);
}

let totalSteps = 0;
let memo = new Map<number, number>();

process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "").map(f => parseInt(f, 10));
  for (const n of numbers) {
    if (!memo.has(n)) {
      memo.set(n, collatzSteps(n));
    }
    totalSteps += memo.get(n);
  }
});

process.stdin.on("end", () => {
  console.log(`total=${totalSteps}`);
});
