const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0n;
  let sum = 0n;
  for (const part of parts) {
    if (part.trim() === "") continue;
    const firstColon = part.indexOf(":");
    if (firstColon === -1 || !/^(\d+):(\d+)$/.test(part)) continue;
    const value = BigInt(parseInt(part.slice(0, firstColon), 10));
    const freq = BigInt(parseInt(part.slice(firstColon + 1), 10));
    count += freq;
    sum += value * freq;
  }
  console.log(`count=${count} sum=${sum}`);
});
