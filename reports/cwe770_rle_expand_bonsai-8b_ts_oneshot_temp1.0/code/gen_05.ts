const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let first = true;
  for (const f of s.split(/,+/)) {
    if (f.trim() === "") continue;
    const [value, freq] = f.split(':');
    if (value.trim() === "" || freq.trim() === "") continue;
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) continue;
    const freqNum = parseInt(freq, 10);
    if (Number.isNaN(freqNum)) continue;
    if (first || num * freqNum > sum) { sum = num * freqNum; first = false; }
    count += freqNum;
  }
  console.log(`count=${count} sum=${sum}`);
});
