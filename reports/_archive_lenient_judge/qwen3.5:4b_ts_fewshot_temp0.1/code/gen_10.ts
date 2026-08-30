const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換する関数（整数として解釈できない場合は無視）
    const numStr = parseInt(token, 10).toString(); 
    let n: number | null = null;

    try {
      if (numStr.trim() === "") continue; // 空白のみを含む場合もスキップ
      n = Number(numStr);
      
      // NaN や非数値の場合は処理を続行しない（parseInt は空文字列や "abc" を返す）
      if (!Number.isNaN(n)) {
        const existingCount = count.get(n) ?? 0;
        count.set(n, existingCount + 1);
        
        // BigInt で合計を更新し、64bit 範囲内であることを保証（問題文の制約通り）
        sum += BigInt(n); 
      }
    } catch (e) {
      continue;
    }
  }

  const totalItems = count.size;
  
  console.log(`count=${totalItems} sum=${sum}`);
});
