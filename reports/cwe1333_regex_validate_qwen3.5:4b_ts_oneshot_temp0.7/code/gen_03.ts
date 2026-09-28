const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  for (const line of lines) {
    if (!line || /^\s*$/.test(line)) continue;
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    if (parts.length === 0) continue;
    let isValid = true;
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) {
        isValid = false;
        break;
      }
    }
    if (isValid) validCount++;
  }
  console.log(`valid=${validCount}`);
});
