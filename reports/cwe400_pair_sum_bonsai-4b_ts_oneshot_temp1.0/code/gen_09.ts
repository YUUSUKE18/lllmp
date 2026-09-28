const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const target = parseInt(lines[0], 10);
  const pairs = lines.slice(1).filter((line) => {
    const n = parseInt(line, 10);
    return n !== NaN && n >= target && n <= target + 1;
  }).length / 2;
  console.log(`pairs=${pairs}`);
});
