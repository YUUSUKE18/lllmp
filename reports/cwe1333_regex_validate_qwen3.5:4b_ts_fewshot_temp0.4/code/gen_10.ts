const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  for (const line of s.split("\n")) {
    if (line.length === 0) continue;
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    const parts = trimmed.split(",");
    if (parts.length < 1) continue;
    for (const part of parts) {
      if (!/^\d+$/.test(part)) {
        break;
      }
    }
    if (parts.length >= 1) validCount++;
  }
  console.log(`valid=${validCount}`);
});
