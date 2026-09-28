const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const memo = new Map<number, number>();
  const numbers = s.split(/\s+/).filter(n => {
    const num = parseInt(n, 10);
    return !isNaN(num) && num !== 0;
  }).map(n => parseInt(n, 10));
  
  for (const n of numbers) {
    if (memo.has(n)) continue;
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (memo.has(current)) {
        count += memo.get(current);
        break;
      }
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      memo.set(current, count + 1);
      count++;
    }
    total += count;
  }
  console.log(`total=${total}`);
});
