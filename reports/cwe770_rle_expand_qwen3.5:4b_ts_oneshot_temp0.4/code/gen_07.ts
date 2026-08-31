const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (!part.trim()) continue;
    const [valStr, cntStr] = part.trim().split(":");
    if (!valStr || !cntStr) continue;
    const val = BigInt(valStr);
    const cnt = BigInt(cntStr);
    if (val <= 0n || cnt < 0n) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
