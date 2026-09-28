const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines: string[] = s.split("\n");
  let validCount = 0;
  for (const row of lines) {
    if (row.trim() === "") continue;
    const trimmed = row.trim();
    const parts = trimmed.split(",");
    const isAllNumbers = parts.every(p => /^\d+$/.test(p));
    if (isAllNumbers && parts.length > 0) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
