const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const numMap = new Map<number, number>();
  let totalHandCount = 0;

  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;

    if (n === 1) {
      continue;
    }

    let current = n;
    let handCount = 0;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      if (numMap.has(current)) {
        handCount += numMap.get(current);
      } else {
        numMap.set(current, 1);
        handCount += 1;
      }
    }
    numMap.set(n, handCount);
    totalHandCount += handCount;
  }

  console.log(`total=${totalHandCount}`);
});
