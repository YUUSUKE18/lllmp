const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(l => l.trim() !== "").length;
  const numbers = lines.map(l => l.trim()).filter(n => /^\d+$/.test(n));
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of numbers) {
    let num = parseInt(n, 10);
    if (memo.has(num)) continue;
    let count = 0;
    let current = num;
    while (current !== 1) {
      if (memo.has(current)) {
        count += memo.get(current);
        break;
      }
      if (current % 2 === 0) current /= 2;
      else current = 3 * current + 1;
      count++;
      memo.set(current, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
