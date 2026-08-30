const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    if (!/^\s*[\d\s,]+\s*$/.test(line)) continue;
    const parts = line.split(",");
    for (const part of parts) {
      const n = parseInt(part.trim(), 10);
      if (Number.isNaN(n)) continue;
    }
    validCount++;
  }
  console.log(`valid=${validCount}`);
});
