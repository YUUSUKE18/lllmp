const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const elements = s.split(/,+/).map(e => e.trim());
  const seen = new Set<number>();
  const count = 0;
  let sum = 0;
  for (const e of elements) {
    if (!e || isNaN(parseInt(e, 10))) continue;
    const num = parseInt(e, 10);
    if (!seen.has(num)) {
      seen.add(num);
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
