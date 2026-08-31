const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const token of s.split(",")) {
    if (!/^\d+:$/.test(token.trim())) continue;
    const [val, times] = token.trim().split(":").map(Number);
    if (isNaN(val) || isNaN(times) || times < 0) continue;
    count += times;
    sum += val * times;
  }
  console.log(`count=${count} sum=${sum}`);
});
