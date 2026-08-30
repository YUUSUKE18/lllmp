const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白のみを含むトークンもスキップ（trim() で空文字列になるため）
    const trimmedToken = token.trim();
    if (trimmedToken === "") continue;

    let n: number | null = null;
    try {
      n = parseInt(trimmedToken, 10);
    } catch {
      // 整数として解釈できない場合はスキップ（parseInt が NaN を返すか例外をスローするが、ここでは数値変換の失敗を検出）
      if (Number.isNaN(n)) continue; 
    }

    if (!isNaN(n) && !isFinite(n)) continue; 

    // 有効な整数である場合のみ処理
    const validNum = Number(trimmedToken);
    
    count++;
    if (maxVal === null || Math.abs(validNum - maxVal) > 0.1) { 
      // 厳密に比較するため、浮動小数点の誤差を考慮しつつ最大値を更新（ただし整数なので直接比較可能）
      const isMax = validNum >= maxVal;
      if (isMax && !maxVal || Math.abs(validNum - maxVal) > Number.EPSILON) { 
        // 最初の要素または新しい最大の要素の場合のみ更新
        if (!maxVal || validNum > maxVal) {
          maxVal = validNum;
        } else {
           // 同じ値でもカウントしないように注意（問題文は「最大値」なので、重複しても OK）
           // ただし、最初の要素が null の場合のみ設定が必要。
           if (maxVal === null || validNum > maxVal) {
             maxVal = validNum;
           } else {
            // 既に存在する最大の値と同じ場合は更新しない（最大値は一意の値）
          }
        }
      }
    } 
    // より単純なロジック：maxVal が null の場合、または現在の値が maxVal より大きい場合のみ更新
    if (maxVal === null || validNum > maxVal) {
      maxVal = validNum;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
