const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  let memo = new Map<number, number>();
  let total = 0;
  let lineNum = 0;
  for (const f of data.join("\n")).split(/\s+/).forEach((val) => {
    if (!/^\s*-\d+$/.test(val)) return;
    const n = parseInt(val, 10);
    if (n < 1) return;
    const result = memo.get(n) || calculateHandcount(n);
    memo.set(n, result);
    total += result;
  });
  console.log(`total=${total}`);
});
function calculateHandcount(n: number): number {
  let count = 0;
  let current = n;
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    count++;
  }
  return count;
}
