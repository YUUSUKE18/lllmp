const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const target = parseInt(s.split(/\s+/)[0], 10);
  let pairs = 0;
  for (let i = 1; i < lines.length; i++) {
    const numStr = lines[i].trim();
    if (numStr === "") continue;
    const n = parseInt(numStr, 10);
    if (n === undefined || n < 0 || n > 2**63 - 1) continue;
    if (n === target) {
      pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
