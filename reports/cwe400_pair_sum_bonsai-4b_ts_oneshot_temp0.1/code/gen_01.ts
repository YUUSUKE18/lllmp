const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let pairs = 0;
  const target = parseInt(lines[0], 10);
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const numbers = line.split(/\s+/);
    for (const numStr of numbers) {
      const n = parseInt(numStr, 10);
      if (n === target) {
        pairs++;
      }
    }
  }
  console.log(`pairs=${pairs}`);
});
