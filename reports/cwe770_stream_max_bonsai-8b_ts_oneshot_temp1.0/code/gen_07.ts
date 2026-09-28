const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/).map(e => e.trim());
  const count = elements.filter(n => /^\d+$/.test(n)).length;
  const max = elements
    .filter(n => /^\d+$/.test(n))
    .map(n => parseInt(n, 10))
    .reduce((a, b) => a > b ? a : b, 0);
  console.log(`count=${count} max=${max}`);
});
