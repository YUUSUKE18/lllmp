const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const item of s.split(",")) {
    const [value, freq] = item.split(":").map(Number);
    if (value === 0 || freq === 0) continue;
    count += freq;
    sum += value * freq;
  }
  console.log(`count=${count} sum=${sum}`);
});
