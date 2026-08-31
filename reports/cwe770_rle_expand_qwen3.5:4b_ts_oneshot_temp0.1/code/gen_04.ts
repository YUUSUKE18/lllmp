const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n, sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (part.trim() === "") continue;
    const [valStr, cntStr] = part.split(":");
    if (!valStr || !cntStr) continue;
    const val = BigInt(parseInt(valStr.trim(), 10));
    const cnt = BigInt(parseInt(cntStr.trim(), 10));
    if (isNaN(Number(val)) || isNaN(Number(cnt))) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
