const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const item of s.split(",")) {
    if (!item.trim()) continue;
    const [value, freq] = item.split(":").map(Number);
    if (Number.isNaN(value) || Number.isNaN(freq)) continue;
    if (freq < 0) continue;
    count += freq;
    sum += value * freq;
  }
  console.log(`count=${count} sum=${sum}`);
});
