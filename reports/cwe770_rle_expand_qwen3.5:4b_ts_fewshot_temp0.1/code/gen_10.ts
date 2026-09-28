const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const part of s.split(",")) {
    if (!/^\d+:\d+$/.test(part.trim())) continue;
    const [valStr, cntStr] = part.trim().split(":");
    const val = BigInt(valStr);
    const cnt = Number(cntStr);
    if (cnt < 0) continue;
    count += cntn;
    sum += val * cntn;
  }
  console.log(`count=${count} sum=${sum}`);
});
