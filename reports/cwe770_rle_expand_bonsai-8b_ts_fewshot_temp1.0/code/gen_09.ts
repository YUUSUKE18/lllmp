const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(",");
  let count = 0, sum = 0;
  for (const entry of entries) {
    const [value, times] = entry.split(":").map(Number);
    if (isNaN(value) || isNaN(times) || value < 0 || times < 0) continue;
    for (let i = 0; i < times; i++) {
      count++;
      sum += value;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
