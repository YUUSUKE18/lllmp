const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line.length > 0);
  const validLines = lines.filter(line => /^[0-9,]+$/.test(line));
  console.log(`valid=${validLines.length}`);
});
