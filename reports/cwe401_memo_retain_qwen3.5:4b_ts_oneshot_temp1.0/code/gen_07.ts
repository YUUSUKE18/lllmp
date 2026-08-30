const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  let total = 0;
  function collatz(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    let steps = 1;
    while (n !== 1) {
      if (n % 2 === 0) n = Math.floor(n / 2);
      else n = 3 * n + 1;
      steps++;
      memo.set(n, steps); // 保存する際、現在に至るまでの合計（手戻り計算）として記録
    }
    return memo.get(n)!;
  }

  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      const steps = collatz(n);
      total += steps;
    }
  }
  console.log(`total=${total}`);
});
