const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0, first = true;
  for (const f of s.split(/,+/)) {
    const [val, num] = f.split(':').map(Number);
    if (isNaN(val) || isNaN(num)) continue;
    count += num;
    sum += val * num;
    if (first) first = false;
  }
  console.log(`count=${count} sum=${sum}`);
});
