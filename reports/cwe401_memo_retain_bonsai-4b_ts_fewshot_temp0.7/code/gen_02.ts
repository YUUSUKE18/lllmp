const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\s+/).filter(Boolean).length;
  const results = new Map<number, number>();
  
  // クエリ読み取る
  for (const line of s.split(/\s+/)) {
    const n = parseInt(line, 10);
    if (isNaN(n) || n <= 0) continue;
    
    let steps = 0;
    let current = n;
    
    // 1〜nを処理
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    
    // 1に到達するまでの手数を記録
    results.set(current, steps);
  }
  
  // 手数を合計
  let totalSteps = 0;
  for (const [n, steps] of results) {
    totalSteps += steps;
  }
  
  console.log(`total=${totalSteps}`);
});
