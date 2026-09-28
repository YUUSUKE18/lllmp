const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,/);
  let count = 0, max = -9223372036854775808;
  for (const e of elements) {
    const trimmed = e.trim();
    if (trimmed === "") continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    count++;
    if (n > max) max = n;
  }
  console.log(`count=${count} max=${max}`);
});
