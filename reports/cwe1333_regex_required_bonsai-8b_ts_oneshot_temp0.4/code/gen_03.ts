const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const lines = data.map(b => b.toString("utf8").trim()).filter(line => /^[0-9,]+$/.test(line));
  const valid = lines.length > 0 ? lines[0].split(/,/).filter(n => n.trim() !== "").length : 0;
  console.log(`valid=${valid}`);
});
