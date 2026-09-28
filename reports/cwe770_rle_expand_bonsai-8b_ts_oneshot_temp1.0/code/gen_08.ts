const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  const parts = s.split(/,+/);
  for (const part of parts) {
    const [val, freq] = part.split(':');
    if (!val || !freq) continue;
    const n = parseInt(val, 10);
    if (Number.isNaN(n)) continue;
    const num = parseInt(freq, 10);
    if (num < 0) continue;
    count += num;
    sum += n * num;
  }
  console.log(`count=${count} sum=${sum}`);
});
