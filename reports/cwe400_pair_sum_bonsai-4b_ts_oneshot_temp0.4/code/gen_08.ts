const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let pairs = 0;
  const target = parseInt(lines[0].trim(), 10);
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || !/\d+$/.test(line)) continue;
    const num = parseInt(line, 10);
    if (num === target) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
