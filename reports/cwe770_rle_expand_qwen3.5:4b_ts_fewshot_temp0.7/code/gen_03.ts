const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0n;
  let sum = 0n;
  for (const part of parts) {
    if (part.trim() === "") continue;
    const colonIndex = part.indexOf(":");
    if (colonIndex === -1) continue;
    const valStr = part.slice(0, colonIndex).trim();
    const countStr = part.slice(colonIndex + 1).trim();
    if (!/\d$/.test(valStr)) continue;
    if (!/\d+/.test(countStr)) continue;
    const n = BigInt(parseInt(valStr, 10));
    const k = BigInt(parseInt(countStr, 10));
    if (k < 0n) continue;
    count += n * k;
    sum += n * k;
  }
  console.log(`count=${count} sum=${sum}`);
});
