const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const memo = new Map<number, number>();
  
  for (const line of s.split(/\r\n/g)) {
    const num = parseInt(line, 10);
    if (isNaN(num) || num <= 0) continue;
    const key = num;
    if (memo.has(key)) {
      total += memo[key];
      continue;
    }
    let count = 0;
    let n = num;
    while (n !== 1) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      count++;
      memo.set(n, count);
    }
    total += count;
  }
  console.log(`total=${total}`);
});
