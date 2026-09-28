const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    if (n === 1) {
      total += 0;
      memo.set(n, 0);
      continue;
    }
    let count = 0;
    let current = n;
    while (memo.has(current)) {
      current = memo.get(current);
      count += 1;
    }
    memo.set(current, count);
    let temp = current;
    while (temp !== 1) {
      if (temp % 2 === 0) {
        temp = temp / 2;
      } else {
        temp = 3 * temp + 1;
      }
      count += 1;
    }
    total += count;
  }
  console.log(`total=${total}`);
});
