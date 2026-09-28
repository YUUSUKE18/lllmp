const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const token of s.split(/,+/)) {
    if (!token.trim()) continue;
    const [val, cnt] = token.split(":").map(Number);
    if (Number.isNaN(val) || Number.isNaN(cnt)) continue;
    if (cnt < 0) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
