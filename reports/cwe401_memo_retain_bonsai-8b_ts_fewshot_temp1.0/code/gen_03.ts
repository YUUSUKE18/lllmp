const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/);
  const numbers = lines.map(l => l.trim()).filter(n => n && /^\d+$/.test(n));
  const memo = new Map<string, number>();
  let total = 0;
  for (const n of numbers) {
    let current = Number(n);
    let steps = 0;
    while (current !== 1) {
      if (memo.has(current)) {
        steps += memo.get(current);
        break;
      }
      if (current % 2 === 0) current /= 2;
      else current = 3 * current + 1;
      steps++;
      memo.set(current, steps);
    }
    total += steps;
  }
  console.log(`total=${total}`);
});
