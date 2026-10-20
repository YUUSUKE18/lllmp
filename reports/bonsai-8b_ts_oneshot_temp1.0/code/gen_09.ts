const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/);
  const seen = new Set<number>();
  let count = 0, sum = 0;
  for (const item of items) {
    const n = parseInt(item, 10);
    if (isNaN(n)) continue;
    if (seen.has(n)) continue;
    seen.add(n);
    count++;
    sum += n;
  }
  console.log(`count=${count} sum=${sum}`);
});
