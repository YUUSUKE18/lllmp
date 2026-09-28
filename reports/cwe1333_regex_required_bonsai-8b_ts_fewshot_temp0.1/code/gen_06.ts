const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const validLines = 0;
  const lines = s.split("\n");
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    const parts = trimmedLine.split(",");
    if (parts.length < 2) continue;
    const numbers = parts.filter(p => /^\d+$/.test(p));
    if (numbers.length >= 2) validLines++;
  }
  console.log(`valid=${validLines}`);
});
