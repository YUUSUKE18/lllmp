const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const queries = s.split(/\s+/).filter(q => /^\d+$/.test(q));
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of queries) {
    const num = parseInt(n, 10);
    if (num === 1) total += 0;
    if (memo.has(num)) continue;
    let count = 0;
    let current = num;
    while (current !== 1) {
      if (current % 2 === 0) current /= 2;
      else current = 3 * current + 1;
      count++;
      memo.set(current, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
