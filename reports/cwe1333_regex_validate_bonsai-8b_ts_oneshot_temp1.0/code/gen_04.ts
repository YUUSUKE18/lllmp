const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString().trim()).filter(line => /^\d+$/.test(line));
  const valid = lines.length > 0 ? lines.length : 0;
  console.log(`valid=${valid}`);
});
