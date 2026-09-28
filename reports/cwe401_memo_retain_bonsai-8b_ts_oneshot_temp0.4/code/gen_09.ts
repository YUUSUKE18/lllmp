const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0, memo = new Map();
  for (const line of s.split(/\r\n+/)) {
    const n = parseInt(line, 10);
    if (isNaN(n) || n <= 0) continue;
    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current /= 2;
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
