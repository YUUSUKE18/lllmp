const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line);
  const validLines = lines.filter(line => /^[\d,]+$/.test(line));
  console.log(`valid=${validLines.length}`);
});
