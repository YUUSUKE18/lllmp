const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let countMap = new Map<number, number>();
  
  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token.trim(), 10);
      
      // 整数として解釈できない場合は無視（parseInt が NaN を返す場合）
      if (Number.isNaN(n) || !Number.isFinite(n)) continue;

      countMap.set(n, (countMap.get(n) ?? 0) + 1);
    } catch {
      // parseInt はエラーをスローしないが、解析結果が期待外なら無視するロジックも考慮（上記の try/catch でカバー）
      continue;
    }
    
    const uniqueCount = countMap.size;
    let sum = 0n;

    for (const [key, val] of countMap.entries()) {
      // BigInt に変換して合計を計算する
      if (!Number.isInteger(key)) continue; 
      sum += BigInt(Math.abs(Number(key))) * BigInt(val);
    }
    
    console.log(`count=${uniqueCount} sum=${sum}`);
  });
});
