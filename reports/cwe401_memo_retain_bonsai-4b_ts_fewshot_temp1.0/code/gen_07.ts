const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let memo: Map<number, number> = new Map();
  let total = 0;
  for (const f of s.split(/\s+/)) {
    if (!/^\s*-\s*$/.test(f.trim())) continue;
    const n = parseInt(f.trim(), 10);
    if (n <= 0) continue;
    if (memo.has(n)) continue;
    let steps = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    memo.set(n, steps);
    total += steps;
  }
  console.log(`total=${total}`);
});
