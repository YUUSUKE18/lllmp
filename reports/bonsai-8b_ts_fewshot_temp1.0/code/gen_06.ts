const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const arr = s.split(",");
  let count = 0, sum = 0;
  const seen = new Set();
  for (const num of arr) {
    const n = parseInt(num, 10);
    if (n === undefined) continue;
    if (!seen.has(n)) {
      seen.add(n);
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
