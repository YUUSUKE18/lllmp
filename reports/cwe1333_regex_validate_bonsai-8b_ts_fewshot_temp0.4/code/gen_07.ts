const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(",");
    let hasNumbers = false;
    for (const part of parts) {
      const numStr = part.trim();
      if (numStr === "") continue;
      if (/^\d+$/.test(numStr)) {
        hasNumbers = true;
        break;
      }
    }
    if (hasNumbers) valid++;
  }
  console.log(`valid=${valid}`);
});
