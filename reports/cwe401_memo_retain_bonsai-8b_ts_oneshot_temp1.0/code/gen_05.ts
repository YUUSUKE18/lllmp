const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    const nStr = line.trim();
    if (!nStr || isNaN(nStr)) continue;
    const n = parseInt(nStr, 10);
    if (n === 1) {
      total += 0;
      memo.set(n, 0);
      continue;
    }
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    let steps = 0;
    let current = n;
    while (current !== 1) {
      steps++;
      if (current % 2 === 0) {
        current /= 2;
      } else {
        current = 3 * current + 1;
      }
      // 64bitの整数は対応
      if (current > 2 ** 63) {
        memo.set(n, steps);
        total += steps;
        break;
      }
    }
    memo.set(n, steps);
    total += steps;
  }
  console.log(`total=${total}`);
});
