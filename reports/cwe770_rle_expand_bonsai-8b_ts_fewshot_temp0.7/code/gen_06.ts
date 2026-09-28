const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(",");
  let count = 0, sum = 0;
  for (const entry of entries) {
    const [value, occurrences] = entry.split(":").map(Number);
    if (isNaN(value) || isNaN(occurrences)) continue;
    if (value < 0) continue;
    count += occurrences;
    sum += value * occurrences;
  }
  console.log(`count=${count} sum=${sum}`);
});
