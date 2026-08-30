const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let validCount = 0;
  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;

    const parts = trimmed.split(/,/);
    if (parts.length === 0) continue;

    let isValid = true;
    for (const part of parts) {
      if (!/^-?\d+$/.test(part)) {
        isValid = false;
        break;
      }
    }

    if (isValid) validCount++;
  }
  console.log(`valid=${validCount}`);
});
