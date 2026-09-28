const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n+/);
  const memo = new Map<number, number>;
  let total = 0;
  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n) || n < 1) continue;
    if (memo.has(n)) continue;
    let count = 0;
    let num = n;
    while (num !== 1) {
      if (num % 2 === 0) num = num / 2;
      else num = 3 * num + 1;
      count++;
      if (memo.has(num)) break;
      memo.set(num, count);
    }
    if (num === 1) total += count;
    else total += count;
  }
  console.log(`total=${total}`);
});
