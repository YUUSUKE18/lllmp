const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,\s*/);
  const uniqueNumbers = new Set<number>();
  let sum = 0, count = 0;
  for (const e of elements) {
    if (e.trim() === "") continue;
    const n = parseInt(e, 10);
    if (Number.isNaN(n)) continue;
    if (!uniqueNumbers.has(n)) {
      uniqueNumbers.add(n);
      sum += n;
      count++;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
