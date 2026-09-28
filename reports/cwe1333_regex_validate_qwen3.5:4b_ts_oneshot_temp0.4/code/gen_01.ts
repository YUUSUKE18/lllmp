const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;

    if (!/^[0-9,-]+$/.test(trimmed)) {
      continue;
    }

    const parts = trimmed.split(",");
    const hasNonDigit = parts.some((p) => !/^-?[0-9]+$/.test(p));
    
    if (hasNonDigit) {
      continue;
    }

    validCount++;
  }

  console.log(`valid=${validCount}`);
});
