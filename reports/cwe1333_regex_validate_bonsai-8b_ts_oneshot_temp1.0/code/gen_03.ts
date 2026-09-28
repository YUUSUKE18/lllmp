const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString("utf8").trim()).filter(l => l.length > 0);
  const valid = lines.every(line => line.split(",").filter(n => n.trim() && /^\d+$/.test(n))).length > 0;
  console.log(`valid=${valid}`);
});
