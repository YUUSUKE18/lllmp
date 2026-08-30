const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    if (!trimmed.match(/^[0-9,\s]+$/)) continue;
    const parts = trimmed.split(",");
    let hasNonDigit = false;
    for (const part of parts) {
      if (part.length > 0 && !/^\d+$/.test(part)) {
        hasNonDigit = true;
        break;
      }
    }
    if (!hasNonDigit) validCount++;
  }
  console.log(`valid=${validCount}`);
});
