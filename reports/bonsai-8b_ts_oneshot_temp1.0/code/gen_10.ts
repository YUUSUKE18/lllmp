const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/).map(f => f.trim()).filter(n => /^\d+$/.test(n));
  const seen = new Set<string>();
  let count = 0, sum = 0;
  for (const item of items) {
    const num = parseInt(item, 10);
    if (Number.isNaN(num)) continue;
    if (!seen.has(item)) {
      seen.add(item);
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
