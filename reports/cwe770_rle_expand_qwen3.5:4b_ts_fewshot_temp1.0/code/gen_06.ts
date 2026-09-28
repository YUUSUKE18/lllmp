const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n, sum = 0n;
  for (const part of s.split(",")) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    if (!/^\d+:\d+$/.test(trimmed)) continue;
    const [valueStr, repeatStr] = trimmed.split(":");
    const value = BigInt(valueStr);
    const repeat = BigInt(repeatStr);
    if (repeat < 0n) continue;
    count += repeat;
    sum += value * repeat;
  }
  console.log(`count=${count} sum=${sum}`);
});
