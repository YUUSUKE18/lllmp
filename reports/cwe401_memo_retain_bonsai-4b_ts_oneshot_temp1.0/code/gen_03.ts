const memo = new Map<number, number>();
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\s+/);
  let total = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (n === 1) continue; // 1 は手数 0
    if (memo.has(n)) continue;
    let current = n;
    let steps = 0;
    const seen = new Set<string>();
    while (current !== 1 && seen.size < 64) { // 64 は64-bit整数範囲の安全性を考慮
      seen.add(current.toString());
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    if (current === 1) {
      total += steps;
    }
  }
  console.log(`total=${total}`);
});
