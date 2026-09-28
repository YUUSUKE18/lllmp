const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  const memo = new Map<number, number>();
  let total = 0;

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    for (const part of parts) {
      if (!/^\s*-\s*$/.test(part)) {
        const n = parseInt(part, 10);
        if (n <= 0) continue;
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
          if (current > 2**32) break;
        }
        if (current === 1) {
          memo.set(n, steps);
          total += steps;
        }
      }
    }
  }

  console.log(`total=${total}`);
});
