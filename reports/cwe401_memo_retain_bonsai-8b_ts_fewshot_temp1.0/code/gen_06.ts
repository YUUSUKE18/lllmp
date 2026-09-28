const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/).filter(l => l.trim() !== "");
  const numbers = lines.map(line => parseInt(line, 10)).filter(n => !isNaN(n) && n > 0);
  const memo = new Map<number, number>;
  const total = 0;
  for (const n of numbers) {
    if (memo.has(n)) continue;
    let count = 0;
    let current = n;
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
