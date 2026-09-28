const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line);
  const validLines = lines.map(line => line.split(",")).filter(arr => arr.length > 1);
  console.log(`valid=${validLines.length}`);
});
