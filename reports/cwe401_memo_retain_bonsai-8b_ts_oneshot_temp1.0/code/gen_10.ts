const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const queries = s.split(/\r?\n+/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const query of queries) {
    if (!query.trim()) continue;
    const n = parseInt(query, 10);
    if (n === 1) {
      total += 0;
      continue;
    }
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    let count = 0;
    let num = n;
    while (num !== 1) {
      if (num % 2 === 0) {
        num = num / 2;
      } else {
        num = 3 * num + 1;
      }
      count++;
      if (memo.has(num)) {
        count += memo.get(num);
        break;
      }
      memo.set(num, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
