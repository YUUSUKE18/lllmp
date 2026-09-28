const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const queries = s.split(/\s+/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const query of queries) {
    if (!query.trim() || isNaN(parseInt(query, 10))) continue;
    const n = parseInt(query, 10);
    if (n === 1) total += 0; continue;
    if (memo.has(n)) total += memo.get(n); continue;
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) current = current / 2;
      else current = 3 * current + 1;
      count++;
      memo.set(current, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
