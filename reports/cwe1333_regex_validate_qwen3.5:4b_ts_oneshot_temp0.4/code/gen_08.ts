const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    const parts = trimmed.split(",");
    if (parts.length < 1) continue;
    let valid = true;
    for (const part of parts) {
      if (!/^-?\d+$/.test(part)) {
        valid = false;
        break;
      }
    }
    if (valid) validCount++;
  }
  console.log(`valid=${validCount}`);
});
