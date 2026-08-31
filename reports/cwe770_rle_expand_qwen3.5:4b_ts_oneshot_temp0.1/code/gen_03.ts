const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (!part.trim()) continue;
    const [valStr, countStr] = part.trim().split(":");
    if (!valStr || !countStr) continue;
    const val = BigInt(parseInt(valStr.trim(), 10));
    const cnt = BigInt(parseInt(countStr.trim(), 10));
    if (cnt < 0n) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
