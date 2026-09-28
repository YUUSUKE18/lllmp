const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/);
  let count = 0, sum = 0;
  for (const item of items) {
    const [value, freq] = item.split(':');
    if (!value || !freq) continue;
    const n = parseInt(value, 10);
    if (Number.isNaN(n)) continue;
    const num = parseInt(freq, 10);
    if (num < 0) continue;
    count += num;
    sum += n * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
