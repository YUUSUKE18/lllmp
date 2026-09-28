const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(l => l.trim()).filter(l => l && l.replace(/[^0-9,]/g, "").split(',').length > 1);
  console.log(`valid=${lines.length}`);
});
