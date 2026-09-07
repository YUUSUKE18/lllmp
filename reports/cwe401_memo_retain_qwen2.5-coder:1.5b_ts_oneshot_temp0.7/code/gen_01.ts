const memo: Map<number, number> = new Map();
function collatzCount(n: number): number {
  if (memo.has(n)) return memo.get(n)!;
  let count = 0;
  while (n !== 1) {
    count++;
    if (n % 2 === 0) n /= 2;
    else n = 3 * n + 1;
  }
  memo.set(n, count);
  return count;
}

let total = 0;
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(c).toString("utf8");
  const lines = s.split(/\s+/);
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (!isNaN(n) && n > 0) {
      total += collatzCount(n);
    }
  }
});
process.stdin.on("end", () => {
  console.log(`total=${total}`);
});
