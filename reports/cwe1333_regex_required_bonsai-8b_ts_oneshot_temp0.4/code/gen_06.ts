const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim());
  const validLines = lines.filter(line => /^\d+(?:,\d+)*$/.test(line));
  console.log(`valid=${validLines.length}`);
});
