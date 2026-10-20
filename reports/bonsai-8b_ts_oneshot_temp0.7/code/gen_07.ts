const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,?\s*/);
  const seen = new Set<number>();
  let count = 0, sum = 0;
  for (const item of items) {
    const num = parseInt(item.trim(), 10);
    if (isNaN(num)) continue;
    if (seen.has(num)) continue;
    seen.add(num);
    count++;
    sum += num;
  }
  console.log(`count=${count} sum=${sum}`);
});
