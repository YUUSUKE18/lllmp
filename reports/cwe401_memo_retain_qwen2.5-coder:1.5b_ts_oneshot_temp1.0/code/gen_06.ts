const memo = new Map<number, number>();
function collatzSteps(n: number): number {
  if (memo.has(n)) return memo.get(n);
  if (n === 1) return 0;
  if (n % 2 === 0) return collatzSteps(n / 2) + 1;
  return collatzSteps(3 * n + 1) + 1;
}

let total = 0;
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8").trim();
  if (s.length === 0) return;
  const numbers = s.split(/\s+/).filter(Number);
  numbers.forEach((n) => {
    total += collatzSteps(n);
  });
});

process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
