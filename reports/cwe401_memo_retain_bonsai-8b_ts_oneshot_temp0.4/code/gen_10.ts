const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n+/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    if (!/^\d+$/.test(line)) continue;
    const n = parseInt(line, 10);
    if (n === 1) continue;
    if (memo.has(n)) continue;
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (memo.has(current)) {
        count += memo.get(current);
        current = 1;
      } else {
        memo.set(current, 1 + count);
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        count++;
      }
    }
    total += count;
  }
  console.log(`total=${total}`);
});
