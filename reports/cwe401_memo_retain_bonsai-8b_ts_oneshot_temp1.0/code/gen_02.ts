const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\r|\n+/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    const n = parseInt(line.trim(), 10);
    if (isNaN(n) || n <= 0) continue;
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
