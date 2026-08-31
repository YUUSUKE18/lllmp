const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n, sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    if (!/^\d+:\d+$/.test(trimmed)) continue;
    const [valStr, countStr] = trimmed.split(":");
    const val = BigInt(valStr);
    const cnt = BigInt(countStr);
    if (cnt < 0n) continue;
    for (let i = 0n; i < cnt; i++) {
      count += 1n;
      sum += val;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
