const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const numMap = new Map<number, number>();
  let total = 0;

  for (const line of lines) {
    const parts = line.split(/\s+/).filter(part => part.trim() !== "");
    if (parts.length === 0) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;

    // 1 に到達するまでの手数を計算
    let steps = 0;
    let current = n;
    if (current === 1) steps = 0;

    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (current > 1000000000000) break;
      steps++;
    }

    numMap.set(n, steps);
    total += steps;
  }

  console.log(`total=${total}`);
});
