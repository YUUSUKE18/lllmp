const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\r/).filter(Boolean).length;
  const results: Map<number, number> = new Map();
  
  for (let i = 0; i < lines; i++) {
    const line = s.substring(i, i + 1).trim();
    if (!/^\d+$/.test(line)) continue;
    const n = parseInt(line);
    if (n === 1) continue;
    
    let count = 0;
    let current = n;
    const memo = new Map();
    
    memo.set(current, 0);
    while (current !== 1) {
      if (memo.has(current)) continue;
      memo.set(current, memo.get(current) + 1);
      current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
    }
    
    // メモを更新（1番の手数を避免するため、nが1の場合はスキップ）
    if (memo.has(n)) {
      count = memo.get(n);
    } else {
      count = 0;
    }
    
    results.set(n, count);
  }
  
  const total = Array.from(results.values()).reduce((a, b) => a + b, 0);
  console.log(`total=${total}`);
});
