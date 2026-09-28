const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(s.split(/\s+/)[0], 10);
  let pairs = 0;
  for (let i = 1; i < s.length; i += 1) {
    const line = s.substring(i, i + 1).trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;
    if (n === goal) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
