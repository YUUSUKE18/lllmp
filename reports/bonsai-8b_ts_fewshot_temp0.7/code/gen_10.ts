const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const arr = s.split(",");
  let count = 0, sum = 0;
  const seen = new Set<number>();
  for (const num of arr) {
    const numStr = num.trim();
    if (!numStr) continue;
    const n = parseInt(numStr, 10);
    if (Number.isNaN(n)) continue;
    if (!seen.has(n)) {
      seen.add(n);
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
