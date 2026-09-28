const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(/,+/);
  let count = 0, sum = 0;
  for (const entry of entries) {
    const parts = entry.split(':');
    if (parts.length !== 2) continue;
    const valueStr = parts[0].trim();
    const numStr = parts[1].trim();
    if (!valueStr || !numStr) continue;
    const value = parseInt(valueStr, 10);
    const num = parseInt(numStr, 10);
    if (isNaN(value) || isNaN(num)) continue;
    if (value < 0) continue;
    count += num;
    sum += value * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
