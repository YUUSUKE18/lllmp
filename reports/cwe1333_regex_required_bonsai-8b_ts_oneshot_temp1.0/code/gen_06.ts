const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => line.length > 0);
  const valid = lines.every(line => /^[0-9]+(?:,[0-9]+)*$/.test(line));
  console.log(`valid=${valid}`);
});
