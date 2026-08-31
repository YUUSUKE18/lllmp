const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = BigInt(0);
  const parts = s.split(/[\n,\s]+/);
  for (const part of parts) {
    if (part.length === 0) continue;
    const colonIndex = part.indexOf(":");
    if (colonIndex === -1) continue;
    const valStr = part.slice(0, colonIndex);
    const countStr = part.slice(colonIndex + 1).trim();
    if (!/^\d+$/.test(valStr.trim()) || !/^\d+$/.test(countStr)) continue;
    const v = Number(valStr.trim());
    const c = Number(countStr);
    if (Number.isNaN(v) || Number.isNaN(c)) continue;
    if (c < 0) continue;
    count += c;
    sum += BigInt(v) * BigInt(c);
  }
  console.log(`count=${count} sum=${sum}`);
});
