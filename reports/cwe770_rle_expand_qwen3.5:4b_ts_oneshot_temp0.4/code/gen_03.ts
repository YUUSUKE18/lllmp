const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (part.trim() === "") continue;
    const colonIndex = part.indexOf(":");
    if (colonIndex === -1) continue;
    const valueStr = part.slice(0, colonIndex).trim();
    const countStr = part.slice(colonIndex + 1).trim();
    if (valueStr === "" || countStr === "") continue;
    const n = BigInt(valueStr);
    const k = BigInt(countStr);
    if (n <= 0n) continue;
    count += k;
    sum += n * k;
  }
  console.log(`count=${count} sum=${sum}`);
});
