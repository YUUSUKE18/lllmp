const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).map(n => n.trim());
  const memo = new Map<number, number>;
  let total = 0;
  for (const num of numbers) {
    if (!/^\d+$/.test(num)) continue;
    const n = parseInt(num, 10);
    if (n === 1) total += 0;
    else if (memo.has(n)) total += memo.get(n);
    else {
      let count = 0;
      let current = n;
      while (current !== 1) {
        if (memo.has(current)) {
          count += memo.get(current);
          current = memo.get(current);
        } else {
          memo.set(current, 1 + count);
          current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
          count++;
        }
      }
      total += memo.get(n);
    }
  }
  console.log(`total=${total}`);
});
