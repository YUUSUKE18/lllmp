const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line && !line.includes(/[^0-9,]/));
  const valid = lines.length > 0;
  console.log(`valid=${valid}`);
});
