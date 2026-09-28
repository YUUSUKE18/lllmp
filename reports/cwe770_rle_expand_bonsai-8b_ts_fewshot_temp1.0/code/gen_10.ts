const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const item of s.split(",")) {
    const [value, countStr] = item.split(":");
    const valueNum = parseInt(value, 10);
    const numCount = parseInt(countStr, 10);
    if (isNaN(valueNum) || isNaN(numCount)) continue;
    if (numCount === 0) continue;
    count += numCount;
    sum += valueNum * numCount;
  }
  console.log(`count=${count} sum=${sum}`);
});
