const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
  for (const part of parts) {
    if (!/^\d+:\d+$/.test(part)) continue;
    const [valStr, cntStr] = part.split(":");
    const val = BigInt(valStr);
    const cnt = BigInt(cntStr);
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
