const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line);
  const validLines = lines.filter(line => line.split(",").filter(n => n.trim() !== "").length > 0);
  console.log(`valid=${validLines.length}`);
});
