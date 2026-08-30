const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    if (line.trim() === "") continue;
    const trimmed = line.trim();
    const parts = trimmed.split(",");
    if (parts.length < 1 || parts.length > 2048) {
      continue;
    }
    for (const p of parts) {
      const clean = p.trim();
      if (clean !== "" && !Number.isNaN(parseFloat(clean)) && parseFloat(clean) >= -9e15 && parseFloat(clean) <= 9e15) {
        continue;
      } else {
        break;
      }
    }
    validCount++;
  }
  console.log(`valid=${validCount}`);
});
