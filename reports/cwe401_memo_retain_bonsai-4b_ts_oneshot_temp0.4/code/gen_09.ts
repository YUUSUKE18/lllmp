const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let memo = new Map<number, number>();
  let total = 0;

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    for (const f of parts) {
      if (!/^\s*$/.test(f)) {
        const n = parseInt(f, 10);
        if (isNaN(n)) continue;
        if (n === 1) continue; // n=1は手数0
        if (memo.has(n)) continue; // 重複の場合はメモ化済み

        let current = n;
        let steps = 0;

        while (current !== 1) {
          if (current % 2 === 0) {
            current = current / 2;
          } else {
            current = 3 * current + 1;
          }
          if (memo.has(current)) {
            steps = memo.get(current);
          } else {
            memo.set(current, steps + 1);
          }
          steps++;
        }

        memo.set(n, steps);
        total += steps;
      }
    }
  }

  console.log(`total=${total}`);
});
