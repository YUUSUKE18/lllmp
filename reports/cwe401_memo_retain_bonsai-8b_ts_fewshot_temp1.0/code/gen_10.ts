const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n").filter(Boolean);
  const memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (n === 0) continue;
    if (memo.has(n)) {
      total += memo[n];
      continue;
    }
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (memo.has(current)) {
        count += memo[current];
        break;
      }
      if (current % 2 === 0) {
        current /= 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
    }
    memo.set(n, count);
    total += count;
  }
  console.log(`total=${total}`);
});
