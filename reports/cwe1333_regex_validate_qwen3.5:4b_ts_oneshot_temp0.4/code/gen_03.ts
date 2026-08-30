const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  for (const line of s.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;
    const parts = trimmedLine.split(",");
    const hasNonDigit = /\D/.test(trimmedLine);
    if (parts.length > 0 && !hasNonDigit) {
      validCount++;
    } else if (parts.length === 1 && /^\d+$/.test(trimmedLine)) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
