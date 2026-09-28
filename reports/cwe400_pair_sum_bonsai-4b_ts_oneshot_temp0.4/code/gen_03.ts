const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = parseInt(lines[0], 10);
  let pairs = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (!part.trim()) continue;
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      if (n === target) {
        pairs++;
      }
    }
  }
  console.log(`pairs=${pairs}`);
});
