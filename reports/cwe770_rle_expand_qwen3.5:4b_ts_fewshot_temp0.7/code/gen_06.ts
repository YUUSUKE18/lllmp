const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = BigInt(0);
  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    const [valStr, repStr] = part.split(":");
    if (!valStr || !repStr) continue;
    const val = parseInt(valStr.trim(), 10);
    const rep = parseInt(repStr.trim(), 10);
    if (isNaN(val) || isNaN(rep)) continue;
    if (rep < 0) continue;
    count += rep;
    sum += BigInt(val) * BigInt(rep);
  }
  console.log(`count=${count} sum=${sum}`);
});
