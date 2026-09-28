const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  const goal = parseInt(lines[0], 10);
  let pairs = 0;
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    if (n === null || n < 0 || n > 2**63 - 1) continue;
    if (n === goal) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
