const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const parts = s.split(",");
  for (const part of parts) {
    if (!part.trim()) continue;
    const [valueStr, countStr] = part.trim().split(":");
    if (!valueStr || !countStr) continue;
    const value = parseInt(valueStr, 10);
    const itemCount = parseInt(countStr, 10);
    if (Number.isNaN(value) || Number.isNaN(itemCount)) continue;
    if (itemCount < 0) continue;
    count += itemCount;
    sum += BigInt(value) * BigInt(itemCount);
  }
  console.log(`count=${count} sum=${sum}`);
});
