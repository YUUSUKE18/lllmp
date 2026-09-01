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
    let next = n;
    let count = 0;
    while (next !== 1) {
      if (next % 2 === 0) next = next / 2;
      else next = 3 * next + 1;
      count++;
    }
    memo.set(n, count);
    return count;
  }

  for (const line of s.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    total += steps(n);
  }
  console.log(`total=${total}`);
});
