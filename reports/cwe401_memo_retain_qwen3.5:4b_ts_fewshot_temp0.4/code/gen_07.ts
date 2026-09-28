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
      next = 3 * n + 1;
    }

    const res = steps(next) + 1;
    memo.set(n, res);
    return res;
  }

  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const n = parseInt(line.trim(), 10);
    if (Number.isNaN(n) || isNaN(parseInt(line, 10))) continue;
    total += steps(n);
  }

  console.log(`total=${total}`);
});
