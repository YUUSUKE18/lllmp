const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const numbers = lines.map(line => line.trim()).filter(Boolean).map(Number);
  const memo = new Map<number, Number>();
  
  let total = 0;
  for (const n of numbers) {
    if (n === 1) continue;
    let steps = 0;
    let current = n;
    while (current !== 1) {
      if (memo.has(current)) continue;
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (current > 32767) break;
      memo.set(current, steps + 1);
      steps++;
    }
    if (memo.has(n)) {
      const stored = memo.get(n);
      if (stored !== current) continue;
    }
    total += steps;
  }
  
  console.log(`total=${total}`);
});
