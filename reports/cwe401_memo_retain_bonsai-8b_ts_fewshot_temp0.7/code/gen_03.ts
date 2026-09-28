const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n+/).filter(l => l.trim());
  const memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n) || n <= 0) continue;
    if (memo.has(n)) total += memo.get(n);
    else {
      let steps = 0;
      let current = n;
      while (current !== 1) {
        steps++;
        if (current % 2 === 0) current = current / 2;
        else current = 3 * current + 1;
      }
      memo.set(n, steps);
      total += steps;
    }
  }
  console.log(`total=${total}`);
});
