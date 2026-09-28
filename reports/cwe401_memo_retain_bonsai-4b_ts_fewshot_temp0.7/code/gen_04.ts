const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  let memo: Map<number, number> = new Map<number, number>();
  let total = 0;
  for (const f of data.map(c => c.toString()).join("\n")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (isNaN(n)) continue;
    if (n === 1) continue; // 1は手数は0
    const current = n;
    let steps = 0;
    while (current % 2 === 0) {
      current = current / 2;
      steps++;
    } else {
      current = 3 * n + 1;
      n = current;
      steps = 1;
    }
    // ここで n が1に達するまでの手数を計算
    while (n !== 1) {
      if (n % 2 === 0) {
        n = n / 2;
        steps++;
      } else {
        n = 3 * n + 1;
        steps++;
      }
    }
    if (memo.has(n)) steps = memo.get(n);
    memo.set(n, steps);
    total += steps;
  }
  console.log(`total=${total}`);
});
