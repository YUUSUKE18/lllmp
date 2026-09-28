const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString("utf8").trim()).filter(line => 
    line && !line.includes(/[^0-9,]/) && line.includes(",");
  const validCount = lines.length > 0 ? lines.length : 0;
  console.log(`valid=${validCount}`);
});
