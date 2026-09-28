const memo: Map<number, number> = new Map();
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let total = 0;
  for (const line of lines) {
    const values = line.trim().split(/\s+/);
    for (const value of values) {
      if (!/^\d+$/.test(value)) continue;
      const n = parseInt(value);
      if (n <= 0) continue;
      if (memo.has(n)) continue;
      let steps = 0;
      let current = n;
      while (current !== 1) {
        current = current % 2 === 0 ? current / 2 : 3 * current + 1;
        if (memo.has(current)) break;
        memo.set(current, steps + 1);
        steps++;
      }
      if (!memo.has(1)) {
        memo.set(1, steps);
      }
      total += steps;
    }
  }
  console.log(`total=${total}`);
});
