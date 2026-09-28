const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;

    const parts = trimmed.split(",");
    if (parts.length < 1) continue;

    for (const part of parts) {
      if (!/^-?\d+$/.test(part)) {
        break;
      }
    }

    if (parts.length >= 1) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
