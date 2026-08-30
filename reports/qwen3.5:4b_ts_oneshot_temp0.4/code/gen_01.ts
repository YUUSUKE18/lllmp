const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/[,]+/);
  const counts = new Map<number, number>();
  for (const part of parts) {
    if (part.trim() === "") continue;
    const n = parseInt(part, 10);
    if (Number.isNaN(n)) continue;
    counts.set(n, (counts.get(n) || 0) + 1);
  }
  let sum = 0n;
  for (const [k, v] of counts.entries()) {
    const n = BigInt(k);
    sum += n * BigInt(v);
  }
  console.log(`count=${counts.size} sum=${sum}`);
});
