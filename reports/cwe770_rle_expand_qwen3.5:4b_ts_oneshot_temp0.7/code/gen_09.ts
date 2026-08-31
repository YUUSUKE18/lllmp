const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (!/^\s*\d+:\s*\d+\s*$/.test(part.trim())) continue;
    const [valStr, cntStr] = part.trim().split(/:/);
    const val = BigInt(parseInt(valStr.trim(), 10));
    const cnt = parseInt(cntStr.trim(), 10);
    if (cnt < 0 || Number.isNaN(cnt)) continue;
    count += BigInt(cnt);
    sum += val * BigInt(cnt);
  }
  console.log(`count=${count} sum=${sum}`);
});
