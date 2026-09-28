const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(s.split(/\s+/)[0]);
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    const n = parseInt(data[i].trim(), 10);
    if (n === undefined || n < 0 || n > 2**63 - 1) continue;
    if (n + goal === 0 || n + goal === 2**63 - 1) continue;
    if (n > goal - 1) continue;
    if (n === goal) count++;
    if (n === goal - 1) count++;
  }
  console.log(`pairs=${count}`);
});
