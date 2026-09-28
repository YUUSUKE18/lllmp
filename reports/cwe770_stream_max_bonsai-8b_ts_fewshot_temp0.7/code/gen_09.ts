const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(",");
  let count = 0, max = -9007199254740992;
  for (const e of elements) {
    e = e.trim();
    if (e === "") continue;
    if (isNaN(e)) continue;
    const num = parseInt(e, 10);
    if (num > max) max = num;
    count++;
  }
  console.log(`count=${count} max=${max}`);
});
