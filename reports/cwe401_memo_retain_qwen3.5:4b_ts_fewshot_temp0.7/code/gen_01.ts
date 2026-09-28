const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  function f(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      steps++;
    }
    memo.set(n, steps);
    return steps;
  }

  let total = BigInt(0);
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    total += BigInt(f(Number(n)));
  }

  console.log(`total=${total}`);
});
