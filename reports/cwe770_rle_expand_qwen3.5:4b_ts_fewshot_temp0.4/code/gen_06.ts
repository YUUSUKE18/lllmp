const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    const colonIndex = part.indexOf(":");
    if (colonIndex === -1) continue;
    const keyStr = part.slice(0, colonIndex).trim();
    const valStr = part.slice(colonIndex + 1).trim();
    if (!/^\d+$/.test(keyStr)) continue;
    if (!/^\d+$/.test(valStr)) continue;
    const n = BigInt(keyStr);
    const m = Number(valStr);
    if (Number.isNaN(m) || m < 0) continue;
    count += m;
    sum += BigInt(n) * BigInt(m);
  }
  console.log(`count=${count} sum=${sum}`);
});
