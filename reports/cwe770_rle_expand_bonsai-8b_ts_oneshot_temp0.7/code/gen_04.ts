const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, total = 0;
  const elements = s.split(/,?\s*/);
  for (const e of elements) {
    if (e.trim() === "") continue;
    const [value, freq] = e.split(':');
    const num = parseInt(value, 10);
    const numFreq = parseInt(freq, 10);
    if (Number.isNaN(num) || Number.isNaN(numFreq) || num < 0 || numFreq < 0) continue;
    count += numFreq;
    total += num * numFreq;
  }
  console.log(`count=${count} sum=${total}`);
});
