const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo = new Map<number, number>();
  let total = 0;

  function collatzStep(n: number): number {
    if (memo.has(n)) return memo.get(n)!;
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      steps++;
    }
    memo.set(n, steps);
    return steps;
  }

  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split(/[\s\u3000]+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      if (n < 1) continue;
      
      // 各クエリについてメモ化された結果を計算・追加
      let steps = 0;
      while (n !== 1) {
        if (n % 2 === 0) n = n / 2;
        else n = 3 * n + 1;
        steps++;
      }

      // メモ化
      memo.set(n, steps);

      // 累積合計に追加
      total += steps;
    }
  }

  console.log(`total=${total}`);
});
