const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  const elements = s.split(/,+/);
  for (const e of elements) {
    const [val, cnt] = e.split(":").map(Number);
    if (isNaN(val) || isNaN(cnt)) continue;
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
