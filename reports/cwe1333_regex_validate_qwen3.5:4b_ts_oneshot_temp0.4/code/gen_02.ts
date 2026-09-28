const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    if (!/^\s*[\d,\s]+\s*$/.test(trimmed)) continue;
    const parts = trimmed.split(/[ ,]+/);
    let isNumber = true;
    for (const p of parts) {
      if (/[^0-9]/.test(p.trim())) {
        isNumber = false;
        break;
      }
    }
    if (!isNumber) continue;
    validCount++;
  }
  console.log(`valid=${validCount}`);
});
