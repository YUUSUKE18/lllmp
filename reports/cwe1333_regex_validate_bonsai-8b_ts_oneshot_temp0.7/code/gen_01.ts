const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line.length > 0);
  const valid = lines.every(line => line.split(",").every(cell => cell.trim() !== ""));
  console.log(`valid=${valid}`);
});
