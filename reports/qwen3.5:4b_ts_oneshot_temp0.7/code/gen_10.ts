const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueNumbers = new Set<number>();
  for (const p of parts) {
    if (p.trim() === "") continue;
    const n = parseInt(p, 10);
    if (!Number.isNaN(n)) {
      uniqueNumbers.add(n);
    }
  }
  let sum = 0;
  let count = 0;
  for (const n of uniqueNumbers) {
    sum += n;
    count++;
  }
  console.log(`count=${count} sum=${sum}`);
});
