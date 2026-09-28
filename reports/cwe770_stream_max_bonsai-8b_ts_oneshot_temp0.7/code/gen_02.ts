const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/).filter(e => e.trim() !== "");
  let max = 0, count = 0;
  for (const e of elements) {
    const n = parseInt(e, 10);
    if (Number.isNaN(n)) continue;
    count++;
    if (n > max) { max = n; }
  }
  console.log(`count=${count} max=${max}`);
});
