const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  memo.set(1, 0);

  function steps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
    const res = 1 + steps(next);
    memo.set(n, res);
    return res;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const num: number | null = parseInt(line.trim(), 10);
    if (num == null || Number.isNaN(num)) continue;
    total += steps(num as number);
  }
  console.log(`total=${total}`);
});
