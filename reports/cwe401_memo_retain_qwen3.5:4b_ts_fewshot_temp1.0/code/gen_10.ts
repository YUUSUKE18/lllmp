const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function calc(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let step = 0;
    while (true) {
      if (n % 2 === 0) n = Math.floor(n / 2);
      else n = 3 * n + 1;
      step++;
      if (n === 1) break;
    }

    memo.set(n, step);
    return step;
  }

  for (const line of s.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    try {
      const n = parseInt(trimmed, 10);
      if (!Number.isNaN(n) && n >= 1) {
        total += calc(n);
      }
    } catch (e) {
      // 無視
    }
  }

  console.log(`total=${total}`);
});
