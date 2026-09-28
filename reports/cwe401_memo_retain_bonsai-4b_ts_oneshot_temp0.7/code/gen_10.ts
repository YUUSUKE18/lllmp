const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\s+/);
  const memo = new Map<number, number>();
  let total = 0;

  for (const line of lines) {
    if (!/^\s*$/.test(line)) continue;
    const n = parseInt(line);
    if (isNaN(n)) continue;

    if (n === 1) {
      total += 0;
    } else if (memo.has(n)) {
      total += memo.get(n);
    } else {
      let current = n;
      let steps = 0;
      const seen = new Set<string>();

      while (current !== 1 && !seen.has(current.toString())) {
        seen.add(current.toString());
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
  }

  console.log(`total=${total}`);
});
