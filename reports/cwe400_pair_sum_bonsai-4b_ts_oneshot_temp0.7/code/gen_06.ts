const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = parseInt(lines[0].trim(), 10);
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i].trim(), 10);
    if (n === undefined || n < 0 || n > 2**63 - 1) continue;
    if (n === target) {
      count += 1;
    }
  }
  console.log(`pairs=${count}`);
});
