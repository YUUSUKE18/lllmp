const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;
  for (const q of s.split("\n")) {
    if (q.trim() === "") continue;
    const n = parseInt(q, 10);
    if (Number.isNaN(n)) continue;
    if (n === 1) {
      total += 0;
      continue;
    }
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    let count = 0;
    while (n !== 1) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      count++;
    }
    total += count;
    memo.set(n, count);
  }
  console.log(`total=${total}`);
});
