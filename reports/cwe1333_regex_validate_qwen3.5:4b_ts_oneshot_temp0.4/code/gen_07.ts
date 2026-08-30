const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const trimmed = line.trim();
    if (/[^0-9,]/.test(trimmed)) continue;
    const parts = trimmed.split(",");
    let hasNumber = false;
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (!Number.isNaN(n)) hasNumber = true;
    }
    if (hasNumber) validCount++;
  }
  console.log(`valid=${validCount}`);
});
