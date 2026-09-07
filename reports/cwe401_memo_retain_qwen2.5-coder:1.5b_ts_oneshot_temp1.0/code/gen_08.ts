const memo = new Map<number, number>();

function computeSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;
  if (n === 1) return 0;
  if (n % 2 === 0) return computeSteps(n / 2) + 1;
  return computeSteps(3 * n + 1) + 1;
}

let totalSteps = 0;
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  const inputs = s.split(/\s+/).filter((f) => f.trim() !== "");
  inputs.forEach((n) => {
    const num = parseInt(n, 10);
    if (Number.isNaN(num)) return;
    totalSteps += computeSteps(num);
  });
});
process.stdin.on("end", () => {
  console.log(`total=${totalSteps}`);
});
