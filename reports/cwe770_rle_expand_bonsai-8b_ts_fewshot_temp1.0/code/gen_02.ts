const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const item of s.split(",")) {
    const [value, num] = item.split(":").map(Number);
    if (!isNaN(value) && num >= 0) {
      count += num;
      sum += value * num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
