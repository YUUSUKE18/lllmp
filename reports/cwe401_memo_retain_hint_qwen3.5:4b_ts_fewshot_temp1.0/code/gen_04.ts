const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);
  let total = 0n;

  function collatz(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let count = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      count++;
    }
    memo.set(n, count);
    return count;
  }

  for (const line of s.trim().split(/\r\n|\n/)) {
    if (line.length === 0) continue;
    const parts = line.trim().split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (isNaN(n) || Number.isNaN(parseInt(part, 10))) continue;
      const steps = collatz(n);
      total += BigInt(steps);
    }
  }

  console.log(`total=${Number(total).toString()}`);
});
