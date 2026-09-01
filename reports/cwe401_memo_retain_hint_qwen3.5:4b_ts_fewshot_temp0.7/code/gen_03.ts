const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0n;

  function f(n: number): bigint {
    if (memo.has(n)) return BigInt(memo.get(n)!);
    
    let steps = 0n;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      steps++;
    }
    memo.set(n, steps);
    return steps;
  }

  const parts = s.split(/\r?\n/);
  for (const line of parts) {
    if (!line.trim() || !/\d-/.test(line)) continue;
    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) continue;
    if (n < 1) continue;
    
    const steps = f(n);
    total += BigInt(steps);
  }

  console.log(`total=${total}`);
});
