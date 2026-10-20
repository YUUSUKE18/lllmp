const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = s.split(/,/);
  const seen = new Set<number>();
  let count = 0, sum = 0;
  for (const num of nums) {
    const n = parseInt(num, 10);
    if (!isNaN(n) && !seen.has(n)) {
      seen.add(n);
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
