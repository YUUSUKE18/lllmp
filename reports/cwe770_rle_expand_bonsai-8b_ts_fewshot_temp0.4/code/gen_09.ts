const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/[:,]+/);
  let count = 0, sum = 0;
  for (const el of elements) {
    const [val, cnt] = el.split(':').map(Number);
    if (!isNaN(val) && !isNaN(cnt)) {
      count += cnt;
      sum += val * cnt;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
