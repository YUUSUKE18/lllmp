const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    if (parts.length < 1) continue;
    let isAllInts = true;
    for (const part of parts) {
      if (!/^-?\d+$/.test(part)) {
        isAllInts = false;
        break;
      }
    }
    if (isAllInts && parts.length > 0) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
