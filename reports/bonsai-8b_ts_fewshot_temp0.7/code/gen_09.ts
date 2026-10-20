const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(",");
  let count = 0, sum = 0;
  const seen = new Set();
  for (const item of items) {
    item = item.trim();
    if (!item) continue;
    const num = parseInt(item, 10);
    if (Number.isNaN(num)) continue;
    if (!seen.has(num)) {
      seen.add(num);
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
