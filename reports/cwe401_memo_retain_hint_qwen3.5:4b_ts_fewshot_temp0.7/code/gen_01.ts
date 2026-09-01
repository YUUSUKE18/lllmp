const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0n;

  const step = (n: number): number => {
    if (memo.has(n)) return memo.get(n)!;
    let steps = 0;
    let curr = n;
    while (curr !== 1) {
      if (curr % 2 === 0) curr /= 2n;
      else curr = 3n * curr + 1n;
      if (Number.isSafeInteger(curr)) memo.set(Number(curr), steps);
      else {
        // BigInt を用いて計算し続ける
        const bigSteps = BigInt(steps);
        while (curr !== 1n) {
          if (curr % 2n === 0n) curr /= 2n;
          else curr = 3n * curr + 1n;
          steps++;
        }
        memo.set(Number(curr), steps);
        return Number(curr); // ここでは実際に 1 に達したので戻す（論理上）
      }
    }
    memo.set(n, steps);
    return steps;
  };

  let parts = s.trim().split(/\s+/);
  for (const p of parts) {
    const n = parseInt(p, 10);
    if (Number.isNaN(n)) continue;
    if (!Number.isFinite(n) || n <= 0) continue;
    const steps = step(Number(n));
    total += BigInt(steps);
  }

  console.log(`total=${total}`);
});
