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
    const cnt = BigInt(cntStr);
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
