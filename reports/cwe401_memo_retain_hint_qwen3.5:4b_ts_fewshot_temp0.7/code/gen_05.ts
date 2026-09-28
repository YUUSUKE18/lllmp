const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: number[] = new Array(10000000);
  let total = 0;

  function steps(n: number): number {
    if (memo[n] !== undefined) return memo[n];
    let count = 0;
    while (n !== 1) {
      count++;
      n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
    }
    memo[n] = count;
    return count;
  }

  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    const parts = trimmed.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      total += steps(n);
    }
  }

  console.log(`total=${total}`);
});
