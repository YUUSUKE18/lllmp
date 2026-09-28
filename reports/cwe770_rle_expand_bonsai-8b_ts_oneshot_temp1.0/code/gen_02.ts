const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    const [value, freq] = f.split(':');
    if (value.trim() === "" || freq.trim() === "") continue;
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) continue;
    const freqNum = parseInt(freq, 10);
    if (freqNum < 0) continue;
    if (first) { count = 1; sum = num; first = false; }
    else { count += freqNum; sum += num * freqNum; }
  }
  console.log(`count=${count} sum=${sum}`);
});
