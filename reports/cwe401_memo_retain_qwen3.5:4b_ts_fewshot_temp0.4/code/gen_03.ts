const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  memo.set(1, 0);

  function steps(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    
    let next: number;
    if (n % 2 === 0) {
      next = n / 2;
    } else {
      next = 3 * n + 1;
    }

    const count = 1 + steps(next);
    memo.set(n, count);
    return count;
  }

  let total = 0;
  for (const line of s.split(/\r?\n/)) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    total += steps(n);
  }

  console.log(`total=${total}`);
});
