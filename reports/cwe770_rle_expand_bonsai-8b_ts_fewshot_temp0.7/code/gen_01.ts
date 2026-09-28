const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    const [val, freq] = token.split(":").map(Number);
    if (Number.isNaN(val) || Number.isNaN(freq)) continue;
    if (val < 0 || freq < 0) continue;
    for (let i = 0; i < freq; i++) {
      count++;
      sum += val;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
