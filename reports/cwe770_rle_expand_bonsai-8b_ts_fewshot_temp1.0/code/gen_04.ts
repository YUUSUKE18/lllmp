const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  const parts = s.split(",");
  for (const part of parts) {
    const [val, cnt] = part.split(":").map(Number);
    if (!val || isNaN(val)) continue;
    if (!cnt || cnt < 0) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
