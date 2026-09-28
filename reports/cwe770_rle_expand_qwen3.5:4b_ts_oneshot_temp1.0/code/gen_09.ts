const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = BigInt(0);
  let sum = BigInt(0);
  const parts = s.split(/,+/);
  for (const part of parts) {
    const match = part.match(/^(\d+)\:(\d+)$/);
    if (!match) continue;
    const v = Number(BigInt(match[1]) - 1n); // Convert 0-based index to positive index
    const c = Number(BigInt(match[2]));
    count += BigInt(c);
    sum += BigInt(v) * BigInt(c);
  }
  console.log(`count=${count} sum=${sum}`);
});
