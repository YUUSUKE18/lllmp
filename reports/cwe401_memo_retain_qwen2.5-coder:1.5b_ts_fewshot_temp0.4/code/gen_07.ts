const memo: Map<number, number> = new Map();
function collatzSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + collatzSteps(n / 2);
  return 1 + collatzSteps(3 * n + 1);
}

let total = 0;
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  for (const q of s.split("\n")) {
    if (q.trim() === "") continue;
    const n = parseInt(q, 10);
    if (Number.isNaN(n)) continue;
    total += collatzSteps(n);
  }
});
process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
