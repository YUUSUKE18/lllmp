const memo = new Map<number, number>();
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines = s.split(/\s+/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (n === 1) continue;
    let current = n;
    let steps = 0;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (memo.has(current)) {
        steps = memo.get(current);
      } else {
        steps = 0;
        while (memo.has(current)) {
          steps++;
          current = memo.get(current);
        }
        memo.set(current, steps);
      }
    }
    total += steps;
  }
  console.log(`total=${total}`);
});
