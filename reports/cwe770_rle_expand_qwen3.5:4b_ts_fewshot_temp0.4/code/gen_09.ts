const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const part of s.split(",")) {
    if (!part.trim()) continue;
    const [valueStr, repeatStr] = part.trim().split(":");
    if (valueStr === undefined || repeatStr === undefined) continue;
    const value = BigInt(valueStr);
    const repeat = BigInt(repeatStr);
    if (repeat < 0n) continue;
    count += repeat;
    sum += value * repeat;
  }
  console.log(`count=${count} sum=${sum}`);
});
