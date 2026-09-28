const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  const goal = parseInt(lines[0].trim(), 10);
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!/^\d+$/.test(line)) continue;
    const n = parseInt(line, 10);
    if (n >= goal && goal - n >= 0) {
      count++;
    }
  }
  console.log(`pairs=${count}`);
});
