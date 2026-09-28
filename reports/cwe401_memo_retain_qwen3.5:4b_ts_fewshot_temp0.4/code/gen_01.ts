const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function steps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let next: number;
    if (n % 2 === 0) {
      next = n / 2;
    } else {
      // Use BigInt for intermediate calculation to prevent overflow, then convert back
      const bigN = BigInt(n);
      const bigNext = bigN * 3n + 1n;
      next = Number(bigNext);
    }

    memo.set(n, 1 + steps(next));
    return memo.get(n)!;
  }

  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    total += steps(n);
  }

  console.log(`total=${total}`);
});
