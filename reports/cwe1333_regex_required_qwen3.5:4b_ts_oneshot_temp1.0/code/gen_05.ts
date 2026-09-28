const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    if (!/^\s*[-+]?(?:\d+)(?:,[-+]?\d*)*\s*$/.test(trimmed)) {
      continue;
    }

    const parts = trimmed.split(",");
    for (const part of parts) {
      if (/[^-0-9]/.test(part)) {
        break;
      }
      if (part.length === 0) {
        break;
      }
    }

    validCount++;
  }

  console.log(`valid=${validCount}`);
});
