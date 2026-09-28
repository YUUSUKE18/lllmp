const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const line of s.split(",")) {
    if (!line.trim()) continue;
    const [val, cnt] = line.split(":").map(Number);
    if (isNaN(val) || isNaN(cnt)) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
