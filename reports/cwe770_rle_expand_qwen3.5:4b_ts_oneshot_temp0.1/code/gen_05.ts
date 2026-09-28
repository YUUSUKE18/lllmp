const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (part.trim() === "") continue;
    const match = part.match(/^(\d+)\:(\d+)$/);
    if (!match) continue;
    const val = BigInt(match[1]);
    const freq = BigInt(match[2]);
    count += freq;
    sum += val * freq;
  }
  console.log(`count=${count} sum=${sum}`);
});
