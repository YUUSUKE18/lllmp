const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const part of s.split(",")) {
    if (!part.trim()) continue;
    const [valStr, cntStr] = part.trim().split(":");
    if (!valStr || !cntStr) continue;
    const val = BigInt(parseInt(valStr, 10));
    const cnt = BigInt(parseInt(cntStr, 10));
    if (isNaN(Number(val)) || isNaN(Number(cnt))) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
