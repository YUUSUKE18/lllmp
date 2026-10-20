const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const items = s.split(/,/);
  let seen = new Set<number>();
  let count = 0, sum = 0;
  for (const item of items) {
    const stripped = item.trim();
    if (!stripped) continue;
    const num = parseInt(stripped, 10);
    if (!Number.isNaN(num)) {
      if (!seen.has(num)) {
        seen.add(num);
        count++;
        sum += num;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
