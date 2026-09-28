const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (!/^\d+:\d+$/.test(part.trim())) continue;
    const [valStr, cntStr] = part.trim().split(":");
    const val = BigInt(parseInt(valStr, 10));
    const cnt = BigInt(parseInt(cntStr, 10));
    if (cnt < 0n) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
