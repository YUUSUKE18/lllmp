const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let sum = BigInt(0);
  const counts = new Map<number, number>();

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token.trim(), 10);
      
      // 重複の数をカウントし、合計に追加（BigInt で計算）
      counts.set(n, (counts.get(n) || 0) + 1);
      sum += BigInt(n);
    } catch {
      // 整数として解釈できない要素は無視する
      continue;
    }
  }

  const totalCount = counts.size;
  
  console.log(`count=${totalCount} sum=${sum}`);
});
