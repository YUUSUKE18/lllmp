const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(data[0].trim());
  let pairs = 0;
  for (let i = 1; i < data.length; i++) {
    const n = parseInt(data[i].trim());
    if (n === undefined || n < 0 || n > 2**63 - 1 || n > goal) continue;
    if (n === goal) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
