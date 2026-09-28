const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString().trim()).filter(l => l.length > 0);
  const validLines = lines.filter(line => /^[\d,]+$/.test(line));
  console.log(`valid=${validLines.length}`);
});
