const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || !/^\d+:\d+$/.test(trimmed)) continue;
    const [valStr, countStr] = trimmed.split(":");
    const val = BigInt(valStr);
    const cnt = Number(countStr);
    if (cnt < 0) continue;
    count += cnt;
    sum += val * BigInt(cnt);
  }
  console.log(`count=${count} sum=${sum}`);
});
