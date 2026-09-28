const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/).map(f => f.trim()).filter(Boolean);
  const count = elements.length;
  const max = elements.reduce((acc, val) => {
    const n = parseInt(val, 10);
    if (Number.isNaN(n)) return acc;
    return Math.max(n, acc);
  }, -Infinity);
  console.log(`count=${count} max=${max}`);
});
