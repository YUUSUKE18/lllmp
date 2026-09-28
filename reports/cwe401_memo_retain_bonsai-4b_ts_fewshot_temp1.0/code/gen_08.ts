const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const words = s.split(/\s+/);
  const memo = new Map<number, number>();
  
  let totalHandCount = 0;
  
  for (const word of words) {
    const n = parseInt(word, 10);
    if (isNaN(n) || n <= 0) continue;
    
    if (memo.has(n)) continue;
    
    let current = n;
    let handCount = 0;
    
    while (current !== 1) {
      current = current % 2 === 0 ? current / 2 : 3 * current + 1;
      handCount++;
      if (current > 1000000000) break;
    }
    
    memo.set(n, handCount);
    if (memo.has(n)) {
      // 勾数や非対称数を再利用し、既存の手数を保持
      // ここで再計算して新しい手数を保持
    }
    
    // 全体の手数を加算
    if (memo.has(n)) {
      totalHandCount += memo.get(n);
    } else {
      // ここに、反复処理で結果を追加する必要がある
      // 仮に最初に計算を実行
      const result = calculateHandCount(n);
      memo.set(n, result);
      totalHandCount += result;
    }
  }
  
  console.log(`total=${totalHandCount}`);
});

function calculateHandCount(n: number): number {
  const seen = new Set<number>();
  let current = n;
  let count = 0;
  
  while (current !== 1) {
    if (seen.has(current)) break;
    seen.add(current);
    current = current % 2 === 0 ? current / 2 : 3 * current + 1;
    count++;
  }
  
  // 1に達する前に反复処理をスキップ
  if (current !== 1) {
    return 0;
  }
  
  return count;
}
