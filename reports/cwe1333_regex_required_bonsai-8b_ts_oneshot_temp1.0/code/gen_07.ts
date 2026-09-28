const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(line => line.trim()).filter(line => /^[0-9,]+$/.test(line));
  const valid = lines.length > 0 ? lines[0].split(/,/).filter(n => n.trim() !== "").length : 0;
  console.log(`valid=${valid}`);
});
