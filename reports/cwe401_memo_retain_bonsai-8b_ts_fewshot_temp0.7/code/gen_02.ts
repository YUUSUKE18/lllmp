const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = s.split(/\s+/);
  const memo = new Map<number, number>();
  let total = 0;
  for (const num of nums) {
    if (isNaN(num)) continue;
    const n = parseInt(num, 10);
    if (n === 1) continue;
    if (memo.has(n)) continue;
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (memo.has(current)) {
        current = memo.get(current);
      } else {
        if (current % 2 === 0) current /= 2;
        else current = 3 * current + 1;
        memo.set(current, current);
        count++;
      }
    }
    total += count;
  }
  console.log(`total=${total}`);
});
