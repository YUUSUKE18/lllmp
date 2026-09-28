const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n;
  let sum = 0n;
  for (const part of s.split(",")) {
    if (part.trim() === "") continue;
    const match = part.match(/^(\d+)\:(\d+)$/);
    if (!match) continue;
    const val = BigInt(match[1]);
    const times = BigInt(match[2]);
    count += times;
    sum += val * times;
  }
  console.log(`count=${count} sum=${sum}`);
});
