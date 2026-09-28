const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  const memo = new Map<number, number>();

  for (const line of s.split(/\r?\n+/)) {
    const nStr = line.trim();
    if (!nStr || isNaN(nStr)) continue;
    const n = parseInt(nStr, 10);
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
      memo[current] = count;
    }
    total += count;
  }

  console.log(`total=${total}`);
});
