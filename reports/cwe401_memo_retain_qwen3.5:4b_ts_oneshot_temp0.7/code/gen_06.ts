const memo = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(process.stdin._readableState.object).toString("utf8");
  const lines = s.split(/\r?\n/);
  let total = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    const n = parseInt(line.trim(), 10);
    if (isNaN(n)) continue;
    let count = 0;
    while (true) {
      if (memo.has(n)) {
        count += memo.get(n)!;
        break;
      }
      if (n === 1) {
        memo.set(1, 0);
        break;
      }
      const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
      if (!memo.has(next)) {
        memo.set(next, count);
      }
      if (n === 1) {
        total += memo.get(1)!;
        break;
      }
      n = next;
      count++;
    }
    total += memo.get(n)!;
  }
  console.log(`total=${total}`);
});
