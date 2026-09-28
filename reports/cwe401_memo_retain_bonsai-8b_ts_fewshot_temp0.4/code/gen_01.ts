const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "").length;
  const nums = lines.map(l => parseInt(l, 10)).filter(n => !isNaN(n));
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of nums) {
    if (memo.has(n)) total += memo.get(n);
    else {
      let count = 0;
      let current = n;
      while (current !== 1) {
        if (memo.has(current)) {
          count += memo.get(current);
          break;
        }
        if (current % 2 === 0) current = current / 2;
        else current = 3 * current + 1;
        memo.set(current, count + 1);
      }
      total += count + 1;
    }
  }
  console.log(`total=${total}`);
});
