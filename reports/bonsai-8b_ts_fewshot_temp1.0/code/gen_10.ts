const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0, sum = 0;
  for (const part of parts) {
    part = part.trim();
    if (!part) continue;
    const n = parseInt(part, 10);
    if (Number.isNaN(n)) continue;
    if (count === 0 || n > 0) {
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
