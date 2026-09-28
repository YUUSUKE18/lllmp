const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function steps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    if (n === 1) {
      memo.set(n, 0);
      return 0;
    }
    let next: number;
    if (n % 2 === 0) {
      next = n / 2;
    } else {
      next = 3 * n + 1;
    }
    const res = steps(next);
    memo.set(n, res + 1);
    return memo.get(n)!;
  }

  for (const line of s.split("\n")) {
    if (!line.trim()) continue;
    const numStr = line.trim();
    let n: number | null = null;
    try {
      n = parseInt(numStr, 10);
      if (Number.isNaN(n)) continue;
    } catch {
      // 整数として解釈できない行は無視
      continue;
    }

    const count = steps(n);
    total += count;
  }

  console.log(`total=${total}`);
});
