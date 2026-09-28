const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const queries = s.split(/\s+/).filter(q => q.trim() !== "");
  const memo = new Map<number, number>();
  let total = 0;
  for (const n of queries) {
    let num = parseInt(n, 10);
    if (num === 1) total += 0; continue;
    if (memo.has(num)) total += memo.get(num); continue;
    let count = 0;
    let current = num;
    while (current !== 1) {
      if (current % 2 === 0) current /= 2;
      else current = 3 * current + 1;
      count++;
    }
    memo.set(num, count);
    total += count;
  }
  console.log(`total=${total}`);
});
