const memo: Map<number, number> = new Map<number, number>();
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines = s.split(/\s+/).filter(line => line.trim() !== "");
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (n === 1) continue; // n=1 は手数が0
    if (n % 2 === 0) {
      let current = n / 2;
      while (current !== 1) {
        memo.set(current, memo.get(current) || memo.size);
        current = current / 2;
      }
    } else {
      let current = 3 * n + 1;
      while (current !== 1) {
        memo.set(current, memo.get(current) || memo.size);
        current = current / 2;
      }
    }
    if (memo.has(n)) {
      total += memo.get(n);
    } else {
      total += (n === 1 ? 0 : 1);
    }
  }
  console.log(`total=${total}`);
});
