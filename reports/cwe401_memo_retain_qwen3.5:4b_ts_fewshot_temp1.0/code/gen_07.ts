const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  let total = 0;

  const calcStep = (n: number): number => {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    let steps = 0;
    if (n % 2 === 0) {
      steps += 1 + calcStep(n / 2);
    } else {
      steps += 1 + calcStep(3 * n + 1);
    }
    memo.set(n, steps);
    return steps;
  };

  const parts = s.split(/[\n\r]+/);
  for (const line of parts) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) continue;
    total += calcStep(n);
  }
  console.log(`total=${total}`);
});
