const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(/,/g).map(e => e.trim());
  const uniqueNumbers = new Set<number>();
  let count = 0, sum = 0;
  for (const e of entries) {
    if (e === "") continue;
    const n = parseInt(e, 10);
    if (Number.isNaN(n)) continue;
    if (!uniqueNumbers.has(n)) {
      uniqueNumbers.add(n);
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
