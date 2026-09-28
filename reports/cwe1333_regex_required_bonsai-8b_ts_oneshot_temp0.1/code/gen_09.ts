const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString("utf8").trim()).filter(line => line.length > 0);
  const validLines = lines.filter(line => /^\d+(?:,\d+)*$/.test(line));
  console.log(`valid=${validLines.length}`);
});
