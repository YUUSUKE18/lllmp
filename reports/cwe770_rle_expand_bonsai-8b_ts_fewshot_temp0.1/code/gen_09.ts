const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const item of s.split(",")) {
    if (!item.trim()) continue;
    const [val, cnt] = item.split(":").map(Number);
    if (isNaN(val) || isNaN(cnt)) continue;
    if (val < 0 || cnt < 0) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
