const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(l => l.trim()).filter(l => l.length > 0);
  const validLines = lines.filter(line => /[^0-9,]/g.test(line) && line.includes(","));
  const validCount = validLines.length;
  console.log(`valid=${validCount}`);
});
