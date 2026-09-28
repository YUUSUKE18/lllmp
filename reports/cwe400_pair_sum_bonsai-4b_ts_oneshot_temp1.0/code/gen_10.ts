const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\s+/);
  const pairs = 0;
  const goal = parseInt(lines[0], 10);
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    if (n === undefined || n < 0 || n > 2**63) continue;
    if (goal + n === goal || goal - n === goal) continue;
    if (goal + n === n || goal - n === n) continue;
    if (goal + n === n || goal - n === n) continue;
    if (n > 0 && goal + n === goal) pairs++;
    if (n > 0 && goal - n === goal) pairs++;
    if (n < 0 && goal + n === goal) pairs++;
    if (n < 0 && goal - n === goal) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
