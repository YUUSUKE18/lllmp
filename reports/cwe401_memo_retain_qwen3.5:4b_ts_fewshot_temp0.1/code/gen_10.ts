const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function collatzStep(n: number): number {
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

  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n) || isNaN(Number(trimmed))) continue;
    total += collatzStep(n);
  }

  console.log(`total=${total}`);
});
