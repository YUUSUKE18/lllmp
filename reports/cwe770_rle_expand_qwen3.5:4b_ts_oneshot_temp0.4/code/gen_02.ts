const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (!part.trim()) continue;
    const [valueStr, countStr] = part.split(":").map((s) => s.trim());
    if (!valueStr || !countStr) continue;
    const n = BigInt(valueStr);
    const c = BigInt(countStr);
    if (n < 0n || c < 0n) continue;
    count += c;
    sum += n * c;
  }
  console.log(`count=${count} sum=${sum}`);
});
