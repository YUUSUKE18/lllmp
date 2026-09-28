const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const queries = s.split(/\s+/).filter(q => q.trim() !== "");
  const memo = new Map<number, number>();
  let total = 0;
  for (const nStr of queries) {
    const n = parseInt(nStr, 10);
    if (n === 1) {
      total += 0;
      continue;
    }
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    let count = 0;
    let current = n;
    while (current !== 1) {
      count++;
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
    }
    memo.set(n, count);
    total += count;
  }
  console.log(`total=${total}`);
});
