const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const buffer = Buffer.from(data).toString("utf8");
  const lines = buffer.split(/\r\n/g).filter(Boolean).length;
  const words = buffer.split(/\s+/).filter(Boolean).length;
  const chars = buffer.length;
  const memo = new Map<number, number>();
  let total = 0;
  for (let i = 0; i < lines; i++) {
    const n = parseInt(buffer.trim().split(/\s+/)[i], 10);
    if (n === 1) {
      total += 0;
      continue;
    }
    if (memo.has(n)) {
      total += memo[n];
      continue;
    }
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
      memo.set(current, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
