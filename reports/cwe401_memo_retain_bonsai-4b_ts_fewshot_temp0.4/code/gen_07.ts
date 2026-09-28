const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  let memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;
    if (n === 1) continue;
    let current = n;
    let steps = 0;
    while (current !== 1) {
      if (memo.has(current)) continue;
      memo.set(current, steps);
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    if (memo.has(n)) {
      steps = memo.get(n);
    } else {
      steps = 0;
    }
    total += steps;
  }
  console.log(`total=${total}`);
});
