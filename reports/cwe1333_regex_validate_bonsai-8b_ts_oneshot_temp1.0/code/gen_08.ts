const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString("utf8").trim()).filter(line => /[^0-9,]/g.test(line) || line);
  const validLines = lines.filter(line => line.split(",").filter(n => n.trim() && !n.trim().replace(/[^0-9]/g, "").trim()).length >= 1);
  console.log(`valid=${validLines.length}`);
});
