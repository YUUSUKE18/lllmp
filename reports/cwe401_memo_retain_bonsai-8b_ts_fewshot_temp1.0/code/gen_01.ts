const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let total = 0;
  const memo = new Map<number, number>();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || isNaN(parseInt(line, 10))) continue;
    const n = parseInt(line, 10);
    if (memo.has(n)) {
      total += memo[n];
      continue;
    }
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (memo.has(current)) {
        total += memo[current];
        count += memo[current];
        break;
      }
      if (current % 2 === 0) {
        current /= 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
      memo.set(current, count);
    }
    if (n === 1) {
      total += 0;
    } else {
      total += count;
      memo.set(n, count);
    }
  }
  console.log(`total=${total}`);
});
