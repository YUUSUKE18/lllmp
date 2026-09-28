const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/);
  let count = 0, sum = 0;
  for (const el of elements) {
    const [value, occurrences] = el.split(':');
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) continue;
    const n = parseInt(occurrences, 10);
    if (n < 0) continue;
    count += n;
    sum += num * n;
  }
  console.log(`count=${count} sum=${sum}`);
});
