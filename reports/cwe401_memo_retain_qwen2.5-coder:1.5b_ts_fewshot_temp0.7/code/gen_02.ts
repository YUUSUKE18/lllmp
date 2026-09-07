const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Record<number, number> = {};
  let total = 0;
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (memo[n]) {
      total += memo[n];
      continue;
    }
    let count = 0;
    while (n !== 1) {
      if (n % 2 === 0) n /= 2;
      else n = 3 * n + 1;
      count++;
    }
    total += count;
    memo[n] = count;
  }
  console.log(`total=${total}`);
});
