const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const numMap = new Map<string, number>();
  let total = 0;

  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;

    if (n === 1) continue;

    let current = n;
    let steps = 0;

    // 64bit 整数範囲内での計算
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }

    // 1 に到達するまでの手数をメモ化
    if (numMap.has(current)) {
      steps = numMap.get(current);
    } else {
      numMap.set(current, steps);
    }

    total += steps;
  }

  console.log(`total=${total}`);
});
