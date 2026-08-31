const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = BigInt(0), sum = BigInt(0);
  const parts = s.split(",");
  for (const part of parts) {
    if (part.trim() === "") continue;
    const match = part.match(/^(\d+)\s*:\s*(\d+)$/);
    if (!match) continue;
    const val = BigInt(match[1]);
    const freq = BigInt(match[2]);
    count += freq;
    sum += val * freq;
  }
  console.log(`count=${count} sum=${sum}`);
});
