const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(Boolean);
  const memo = new Map<number, number>();
  let total = 0;

  lines.forEach(line => {
    const n = parseInt(line, 10);
    if (isNaN(n)) return;
    if (memo.has(n)) total += memo[n];
    else {
      let steps = 0;
      let current = n;
      while (current !== 1) {
        steps++;
        current = current % 2 === 0 ? current / 2 : 3 * current + 1;
      }
      memo.set(n, steps);
      total += steps;
    }
  });

  console.log(`total=${total}`);
});
