const data: Buffer[] = [];
let memo: Map<number, number> = new Map();
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const lines = s.split(/\s+/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
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
      if (memo.has(current)) break;
      memo.set(current, steps);
    }
    if (memo.has(1)) memo.set(1, 0);
    total += steps;
  }
  console.log(`total=${total}`);
});
