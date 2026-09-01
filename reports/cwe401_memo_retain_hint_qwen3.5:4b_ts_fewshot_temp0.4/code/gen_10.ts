const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let memo = new Map<number, number>();
  memo.set(1, 0);

  function solve(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let next = n;
    let steps = 0;
    while (next !== 1) {
      if (next % 2 === 0) next = next / 2;
      else next = 3 * next + 1;
      steps++;
      memo.set(next, steps);
    }
    return memo.get(n)!;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    total += solve(n);
  }
  console.log(`total=${total}`);
});
