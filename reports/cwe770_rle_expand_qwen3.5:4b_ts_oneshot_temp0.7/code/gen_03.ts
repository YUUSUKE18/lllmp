const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = BigInt(0);
  let sum = BigInt(0);
  const parts = s.split(",");
  for (const part of parts) {
    if (!part.trim() || !/^\d+:\d+$/.test(part.trim())) continue;
    const [valStr, cntStr] = part.trim().split(":");
    const val = BigInt(parseInt(valStr, 10));
    const cnt = BigInt(parseInt(cntStr, 10));
    if (cnt < 0n) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
