const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const tokens = new Set<number>();
  let countSum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 文字列を整数に変換し、エラーの場合はスキップ
    try {
      const num = parseInt(token, 10);
      
      // Set に存在するか確認（重複除く）
      if (tokens.has(num)) {
        countSum += BigInt(1n) * 2n; 
      } else {
        tokens.add(num);
        countSum += BigInt(1n);
      }
    } catch (_) {
      // 整数として解釈できない場合は無視
    }
  }

  const totalDistinct = tokens.size;
  
  console.log(`count=${totalDistinct} sum=${Number(countSum)}`);
});
