const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let prev = null;
  for (const part of s.split(",")) {
    if (!part.trim()) continue;
    const [val, cnt] = part.split(":").map(Number);
    if (cnt < 0) continue;
    if (val === prev) continue;
    count++;
    sum += val * cnt;
    prev = val;
  }
  console.log(`count=${count} sum=${sum}`);
});
