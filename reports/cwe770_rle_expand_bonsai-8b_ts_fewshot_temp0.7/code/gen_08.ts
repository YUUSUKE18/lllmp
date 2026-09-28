const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const entries = s.split(/,+/);
  let count = 0, sum = 0;
  for (const entry of entries) {
    const [value, num] = entry.split(":");
    if (!value.trim() || !num.trim()) continue;
    const n = parseInt(num, 10);
    if (Number.isNaN(n)) continue;
    count += n;
    sum += n * n;
  }
  console.log(`count=${count} sum=${sum}`);
});
