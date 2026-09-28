const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    const parts = trimmedLine.split(",");
    let hasNumbers = false;
    for (const part of parts) {
      const strippedPart = part.trim();
      if (strippedPart === "") continue;
      if (/^-?\d+$/.test(strippedPart)) {
        hasNumbers = true;
        break;
      }
    }
    if (hasNumbers && parts.length > 1) valid++;
  }
  console.log(`valid=${valid}`);
});
