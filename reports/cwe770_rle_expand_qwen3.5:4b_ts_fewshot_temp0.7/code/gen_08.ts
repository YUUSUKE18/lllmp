const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const p of s.split(",")) {
    if (!p.trim()) continue;
    const [valStr, freqStr] = p.split(":");
    const val = parseInt(valStr.trim(), 10);
    const freq = parseInt(freqStr.trim(), 10);
    if (Number.isNaN(val) || Number.isNaN(freq) || freq < 0) continue;
    count += BigInt(freq);
    sum += BigInt(val) * BigInt(freq);
  }
  console.log(`count=${count} sum=${sum}`);
});
