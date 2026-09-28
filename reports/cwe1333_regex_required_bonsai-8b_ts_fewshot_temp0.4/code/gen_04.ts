const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(",");
    if (parts.length === 0) continue;
    let isInteger = true;
    for (const part of parts) {
      if (part.trim() === "") continue;
      const num = parseInt(part, 10);
      if (Number.isNaN(num)) isInteger = false;
    }
    if (isInteger && parts.length >= 1) valid++;
  }
  console.log(`valid=${valid}`);
});
