const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const parsedInts = lines.map(line => {
    let n = 0;
    for (const ch of line) if (ch >= '0' && ch <= '9') n = n * 10 + (ch - '0');
    if (n === 0) return 0;
    return Number.isInteger(n);
  }).filter(n => n > 0);

  const memo = new Map<number, number>();
  let totalHandcount = 0;

  for (const n of parsedInts) {
    if (memo.has(n)) continue;
    let current = n;
    let steps = 0;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    memo.set(n, steps);
    totalHandcount += steps;
  }

  console.log(`total=${totalHandcount}`);
});
