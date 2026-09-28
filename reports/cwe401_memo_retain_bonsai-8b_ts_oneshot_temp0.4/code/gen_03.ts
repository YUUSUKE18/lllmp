const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n+/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    const nStr = line.trim();
    if (!nStr || isNaN(nStr)) continue;
    const n = parseInt(nStr, 10);
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
      memo.set(current, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
