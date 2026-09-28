const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(/,+/);
  let count = 0, sum = 0;
  for (const entry of entries) {
    const [value, occurrences] = entry.split(':');
    if (!value || !occurrences) continue;
    const num = parseInt(value, 10);
    if (isNaN(num)) continue;
    const numOccurrences = parseInt(occurrences, 10);
    if (numOccurrences < 0) continue;
    count += numOccurrences;
    sum += num * numOccurrences;
  }
  console.log(`count=${count} sum=${sum}`);
});
