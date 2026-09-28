const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(",");
  let count = 0, max = -9223372036854775808;
  for (const e of elements) {
    const n = e.trim();
    if (n === "") continue;
    const num = parseInt(n, 10);
    if (Number.isNaN(num)) continue;
    count++;
    if (num > max) max = num;
  }
  console.log(`count=${count} max=${max}`);
});
