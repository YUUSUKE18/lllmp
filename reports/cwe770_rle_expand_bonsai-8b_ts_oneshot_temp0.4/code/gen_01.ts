const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const f of s.split(/,+/)) {
    const [value, freq] = f.split(':');
    if (value.trim() === "" || freq.trim() === "") continue;
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) continue;
    const numFreq = parseInt(freq, 10);
    if (numFreq < 0) continue;
    count += num;
    sum += num * numFreq;
  }
  console.log(`count=${count} sum=${sum}`);
});
