const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,?\s*/);
  const unique = new Set<number>();
  let count = 0, sum = 0;
  for (const e of elements) {
    e = e.trim();
    if (!e) continue;
    const n = parseInt(e, 10);
    if (Number.isNaN(n)) continue;
    if (!unique.has(n)) {
      unique.add(n);
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
