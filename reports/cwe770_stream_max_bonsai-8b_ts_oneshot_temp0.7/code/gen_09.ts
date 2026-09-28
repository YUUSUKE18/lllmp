const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/).map(f => f.trim()).filter(f => f && !isNaN(f));
  const count = elements.length;
  const max = elements.reduce((a, b) => a > b ? a : b, 0);
  console.log(`count=${count} max=${max}`);
});
