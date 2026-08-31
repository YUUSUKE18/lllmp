const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0n;
  const parts = s.split(",");
  for (const part of parts) {
    if (part.trim() === "") continue;
    const match = part.match(/^(\d+)\:(\d+)$/);
    if (!match) continue;
    const value = Number(match[1]) * BigInt(1n);
    const repeat = Number(match[2]);
    sum += BigInt(value) * BigInt(repeat);
    count += repeat;
  }
  console.log(`count=${count} sum=${sum}`);
});
