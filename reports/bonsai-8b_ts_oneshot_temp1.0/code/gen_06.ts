const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(/,?\s*/);
  const seen = new Set<number>();
  let count = 0, sum = 0;
  for (const entry of entries) {
    const entryTrim = entry.trim();
    if (!entryTrim) continue;
    const numStr = entryTrim.split(/\s+/)[0];
    const num = parseInt(numStr, 10);
    if (Number.isNaN(num)) continue;
    if (!seen.has(num)) {
      seen.add(num);
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
