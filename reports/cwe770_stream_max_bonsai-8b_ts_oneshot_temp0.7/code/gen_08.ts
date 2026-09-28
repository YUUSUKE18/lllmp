const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,?\s*/).filter(e => e.trim() !== "");
  let max = -9223372036854775808, count = 0;
  for (const e of elements) {
    const n = parseInt(e, 10);
    if (n === undefined) continue;
    if (n > max) { max = n; }
    count++;
  }
  console.log(`count=${count} max=${max}`);
});
