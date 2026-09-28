const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const item of s.split(",")) {
    if (!item.trim()) continue;
    const [key, value] = item.split(":").map(Number);
    if (isNaN(key) || isNaN(value)) continue;
    count += value;
    sum += key * value;
  }
  console.log(`count=${count} sum=${sum}`);
});
