const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/);
  let count = 0, sum = 0;
  for (const item of items) {
    const [valueStr, countStr] = item.split(':');
    const value = parseInt(valueStr, 10);
    const num = parseInt(countStr, 10);
    if (isNaN(value) || isNaN(num) || num < 0) continue;
    count += num;
    sum += value * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
