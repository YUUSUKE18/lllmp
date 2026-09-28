const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,+/);
  let count = 0, sum = 0;
  for (const item of items) {
    const [value, freq] = item.split(':');
    if (!value || !freq) continue;
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) continue;
    const numFreq = parseInt(freq, 10);
    if (numFreq < 0) continue;
    count += numFreq;
    sum += numFreq * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
