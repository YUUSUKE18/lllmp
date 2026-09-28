const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(l => l.trim() !== "");
  const target = parseInt(lines[0], 10);
  let pairs = 0;
  for (let i = 1; i < lines.length; i++) {
    const n = parseInt(lines[i], 10);
    if (n === target || target === n) {
      pairs += 1;
    }
  }
  console.log(`pairs=${pairs}`);
});
