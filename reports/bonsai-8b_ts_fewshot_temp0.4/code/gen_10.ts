const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(",");
  let seen = new Set<number>();
  let count = 0, sum = 0;
  for (const item of items) {
    item = item.trim();
    if (!item) continue;
    const n = parseInt(item, 10);
    if (Number.isNaN(n)) continue;
    if (!seen.has(n)) {
      seen.add(n);
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
