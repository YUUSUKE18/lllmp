const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let valid = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(",");
    if (parts.length < 2) continue;
    let isInteger = true;
    for (const part of parts) {
      if (/[^0-9]/.test(part)) {
        isInteger = false;
        break;
      }
    }
    if (isInteger) valid++;
  }
  console.log(`valid=${valid}`);
});
