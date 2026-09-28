const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/).map(e => e.trim());
  const counts = elements
    .filter(e => e && !isNaN(e))
    .map(e => parseInt(e, 10));
  const max = counts.length ? Math.max(...counts) : 0;
  console.log(`count=${counts.length} max=${max}`);
});
