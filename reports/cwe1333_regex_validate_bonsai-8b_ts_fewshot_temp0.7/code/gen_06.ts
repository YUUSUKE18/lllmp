const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split(/\r\n|\n|^\r?\n\s*/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    if (parts.length < 2) continue;
    let hasNumber = false;
    for (const part of parts) {
      const num = parseInt(part, 10);
      if (!isNaN(num)) {
        hasNumber = true;
        break;
      }
    }
    if (hasNumber) valid++;
  }
  console.log(`valid=${valid}`);
});
