const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/);
  let count = 0, sum = 0;
  for (const item of items) {
    const [value, countStr] = item.split(':');
    if (!value || !countStr) continue;
    const num = parseInt(value, 10);
    const numCount = parseInt(countStr, 10);
    if (isNaN(num) || isNaN(numCount) || numCount < 0) continue;
    count += numCount;
    sum += num * numCount;
  }
  console.log(`count=${count} sum=${sum}`);
});
