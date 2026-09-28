const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString().trim()).filter(line => line);
  const valid = lines.length > 0 && lines.every(line => /^[\d,]+$/.test(line));
  console.log(`valid=${valid}`);
});
