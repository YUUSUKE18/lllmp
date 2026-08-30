const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  let total = 0;

  function collatz(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    
    let count = 0;
    let next = n;
    while (next !== 1) {
      if (next % 2 === 0) {
        next = next / 2;
      } else {
        next = 3 * next + 1;
      }
      count++;
    }
    memo.set(n, count);
    return count;
  }

  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n) || !Number.isInteger(n)) continue;
    
    total += collatz(n);
  }

  console.log(`total=${total}`);
});
