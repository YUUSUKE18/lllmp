const memo: Record<number, number> = {};
const process.stdin.on("data", (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (n === 1) {
      total += 0;
    } else if (memo[n] !== undefined) {
      total += memo[n];
    } else {
      let steps = 0;
      let current = n;
      while (current !== 1) {
        steps++;
        if (current % 2 === 0) {
          current /= 2;
        } else {
          current = 3 * current + 1;
        }
      }
      memo[n] = steps;
      total += steps;
    }
  }
  console.log(`total=${total}`);
});
process.stdin.on("end", () => {});
