const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const numbers = s.split(/\s+/).filter(f => f.trim() !== "");
  const memo = new Map<number, number>(new Map());
  let total = 0;

  numbers.forEach(n => {
    const n = parseInt(n, 10);
    if (isNaN(n)) return;
    if (memo.has(n)) return;
    let steps = 0;
    let current = n;
    while (current !== 1) {
      current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
      steps++;
      if (memo.has(current)) break;
      if (current > 2 ** 31) break; // 32bit 限界
    }
    if (memo.has(n)) {
      const memoResult = memo.get(n);
      memo.set(n, memoResult + steps);
    } else {
      memo.set(n, steps);
    }
    total += steps;
  });

  console.log(`total=${total}`);
});
