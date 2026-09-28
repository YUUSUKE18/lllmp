const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0n;
  let sum = 0n;
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const [valueStr, countStr] = trimmed.split(":");
    if (!valueStr || !countStr) continue;
    const value = parseInt(valueStr.trim(), 10);
    const cnt = parseInt(countStr.trim(), 10);
    if (isNaN(value) || isNaN(cnt)) continue;
    if (cnt < 0) continue;
    count += BigInt(cnt);
    sum += BigInt(value) * BigInt(cnt);
  }
  console.log(`count=${count} sum=${sum}`);
});
