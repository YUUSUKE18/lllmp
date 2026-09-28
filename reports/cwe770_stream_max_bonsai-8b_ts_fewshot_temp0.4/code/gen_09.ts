const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max = -9223372036854775808;
  for (const f of s.split(",")) {
    const n = parseInt(f, 10);
    if (n === undefined) continue;
    if (n > max) max = n;
    if (n !== 0 && f.trim() !== "") count++;
  }
  console.log(`count=${count} max=${max}`);
});
