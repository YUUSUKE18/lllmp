const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/[:,]+/);
  let count = 0, sum = 0;
  for (const el of elements) {
    if (!el.trim()) continue;
    const [value, countStr] = el.split(":");
    const valueNum = parseInt(value, 10);
    const numCount = parseInt(countStr, 10);
    if (isNaN(valueNum) || isNaN(numCount)) continue;
    count += numCount;
    sum += valueNum * numCount;
  }
  console.log(`count=${count} sum=${sum}`);
});
