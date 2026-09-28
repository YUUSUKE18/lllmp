const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    const [val, cnt] = f.split(':').map(Number);
    if (val === undefined || cnt === undefined) continue;
    if (first || val > max) { max = val; first = false; }
    count += cnt;
    sum += val * cnt;
  }
  console.log(`count=${count} sum=${sum}`);
});
