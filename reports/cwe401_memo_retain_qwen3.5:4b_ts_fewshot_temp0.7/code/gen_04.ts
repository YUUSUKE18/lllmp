const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  const processQuery = (n: number): number => {
    if (!memo.has(n)) {
      if (n === 1) memo.set(n, 0);
      else {
        const nextVal = n % 2 === 0 ? n / 2 : 3 * n + 1;
        const steps = processQuery(nextVal) + 1;
        memo.set(n, steps);
      }
    }
    return memo.get(n)!;
  };

  let i = 0;
  while (i < s.length) {
    let start = i;
    while (i < s.length && /[0-9]/.test(s[i])) {
      i++;
    }
    const numStr = s.substring(start, i);
    const n = parseInt(numStr, 10);
    if (!isNaN(n)) {
      total += processQuery(n);
    }
  }

  console.log(`total=${total}`);
});
