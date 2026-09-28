const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function solve(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let next: number;
    if (n % 2 === 0) {
      next = n / 2;
    } else {
      // 3n+1 が 64bit を超える可能性があるため、BigInt で計算し、結果を Number に変換
      const bigNext = BigInt(n) * 3n + 1n;
      next = Number(bigNext);
    }

    const steps = 1 + solve(next);
    memo.set(n, steps);
    return steps;
  }

  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    total += solve(n);
  }

  console.log(`total=${total}`);
});
