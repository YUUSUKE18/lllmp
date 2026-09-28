const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/).map(e => e.trim());
  const count = elements.filter(e => e && !isNaN(e)).length;
  const max = elements.filter(e => e && !isNaN(e)).map(Number).reduce((a, b) => a > b ? a : b);
  console.log(`count=${count} max=${max}`);
});
