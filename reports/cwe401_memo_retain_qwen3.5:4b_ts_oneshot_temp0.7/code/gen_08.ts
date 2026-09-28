const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  memo.set(1, 0);

  function collatz(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let count = 0;
    while (n !== 1) {
      n = n % 2 === 0 ? n / 2 : 3 * n + 1;
      count++;
    }
    memo.set(n, count);
    return count;
  }

  let total = 0;
  const parts = s.split(/\s+/);
  for (const str of parts) {
    if (str.trim() === "") continue;
    const n = parseInt(str, 10);
    if (Number.isNaN(n)) continue;
    if (!Number.isInteger(n)) continue;
    total += collatz(n);
  }

  console.log(`total=${total}`);
});
