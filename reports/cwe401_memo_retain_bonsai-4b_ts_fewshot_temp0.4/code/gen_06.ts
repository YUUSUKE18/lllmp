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

    // 1 から n までの処理
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (numMap.has(current)) {
        count += numMap.get(current);
      } else {
        numMap.set(current, 1);
      }
    }
    if (numMap.has(1)) {
      count = 0;
    }
    total += count;
  }

  console.log(`total=${total}`);
});
