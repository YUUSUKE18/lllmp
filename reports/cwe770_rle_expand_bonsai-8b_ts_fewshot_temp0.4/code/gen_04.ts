const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/,+/);
  let count = 0, sum = 0;
  for (const part of parts) {
    const [value, freq] = part.split(':');
    if (!value || !freq) continue;
    const num = parseInt(value, 10);
    if (isNaN(num)) continue;
    const freqNum = parseInt(freq, 10);
    if (freqNum < 0) continue;
    count += freqNum;
    sum += num * freqNum;
  }
  console.log(`count=${count} sum=${sum}`);
});
