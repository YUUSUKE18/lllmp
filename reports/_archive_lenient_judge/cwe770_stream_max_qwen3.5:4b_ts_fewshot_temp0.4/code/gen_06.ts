const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白区切りで分割して各要素を処理（例：「1,2 ,3」の場合）
    const parts = token.trim().split(/\s+/); 
    let currentNum: number | null = null;

    for (const part of parts) {
      if (!part || /^\s*$/.test(part)) continue;
      
      // 整数としてパースし、NaN でないか確認
      const numVal = parseInt(part, 10);
      if (Number.isFinite(numVal)) {
        currentNum = numVal;
      } else {
        currentNum = null;
      }

      if (!isNaN(currentNum) && !isFinite(currentNum)) continue; // NaN や Infinity を除く
      
      const n: number | undefined = Number(currentNum);
      
      if (n === 0 || isNaN(n)) continue; 

      count++;
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
    }
    
    // 上記のロジックを簡略化し、一度に処理する方が読みやすいので再構成:

    const trimmedToken = token.trim();
    if (!trimmedToken) continue;
    
    for (const part of trimmedToken.split(/\s+/)) {
      if (!part || /^\s*$/.test(part)) continue;
      
      // 整数としてパースし、NaN でないか確認
      const n: number = parseInt(part, 10);
      if (isNaN(n) && !Number.isFinite(n)) continue;

      count++;
      if (!maxVal || n > maxVal) {
        maxVal = n;
      }
    }
    
    // 上記のロジックを簡略化し、一度に処理する方が読みやすいので再構成:
    
    const tokens = s.split(",");
    count = 0;
    let currentMax: number | null = null;

    for (const token of tokens) {
      if (!token.trim()) continue; // 空要素・前後の空白は無視
      
      try {
        const numVal = parseInt(token, 10);
        
        // NaN でないか、および有効な整数であるか確認（Infinity は除く）
        if (Number.isFinite(numVal) && !isNaN(numVal)) {
          count++;
          
          if (!currentMax || numVal > currentMax) {
            currentMax = numVal;
          }
        } else {
          // 整数として解釈できない要素は無視（例: "abc", "-1.5" など）
          continue; 
        }
      } catch (e) {
        // parseInt が失敗した場合も無視
        continue;
      }
    }

    console.log(`count=${count} max=${currentMax}`);
});
