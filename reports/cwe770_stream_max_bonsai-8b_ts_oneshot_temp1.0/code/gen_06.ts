const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,?\s*/);
  let count = 0, max = -9007199254740992;
  for (const item of items) {
    if (item.trim() === "") continue;
    const n = parseInt(item, 10);
    if (Number.isNaN(n)) continue;
    count++;
    if (n > max) max = n;
  }
  console.log(`count=${count} max=${max}`);
});
