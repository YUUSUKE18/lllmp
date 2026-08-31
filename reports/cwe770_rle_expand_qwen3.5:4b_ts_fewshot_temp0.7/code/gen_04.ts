const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0n, sum = 0n;
  for (const m of s.split(",")) {
    if (m.trim() === "") continue;
    const parts: string[] = m.split(":");
    if (parts.length !== 2) continue;
    const val = BigInt(parts[0].trim());
    const rep = BigInt(parts[1].trim());
    if (val < 0n || rep < 0n) continue;
    count += rep;
    sum += val * rep;
  }
  console.log(`count=${count} sum=${sum}`);
});
