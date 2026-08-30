const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換し、エラーが発生するかチェックする
    const numStr = token.replace(/\s+/g, ""); 
    let n: number | null = null;

    try {
      n = parseInt(numStr, 10);
      if (isNaN(n)) continue; // 整数として解釈できない場合はスキップ
      
      count++;
      
      if (!maxVal || Math.abs(n) > Math.abs(maxVal)) {
        maxVal = n;
      } else if (n > maxVal) {
        maxVal = n;
      }
    } catch (_) {} // 数値変換エラーの場合もスキップ（parseInt は通常例外を吐かないが、安全のため）
    
    // parseInt の挙動を確認: "123abc" -> NaN, "" -> NaN. 
    // しかし、問題文の「整数として解釈できない要素も無視します」は、
    // 空白が含まれている場合（例：" 10 ") を処理する必要がある。
    // replace(/\s+/g, "") で先頭/末尾の空白を除去し、その後 parseInt が NaN を返す場合はスキップとするのが適切か？
    // 元の例では trim() を使っているが、ここでは token.replace(/\s+/g, "") で内部の空白も除く。
    
    if (isNaN(n)) continue; 
    count++;

    if (!maxVal || n > maxVal) {
      maxVal = n;
    } else if (n < 0 && !maxVal) { // negative check logic adjustment needed? No, simpler:
        // Just use the standard comparison. If first valid number is negative, it sets maxVal correctly.
        // But wait, initial maxVal is null. 
      }
      
    // Re-evaluating the loop structure for clarity and correctness based on examples provided in prompt logic (though this specific task has its own requirements)
  }

  // Let's rewrite the parsing part to be more robust like Example 1 but adapted for comma splitting
  let count2 = 0;
  let maxVal2: number | null = null;
  
  const tokens = s.split(",");
  for (const token of tokens) {
    if (!token.trim()) continue; // Skip empty elements
    
    try {
      // Remove all whitespace to handle cases like "1,000" or " 5 " properly as integers? 
      // The prompt says "comma-separated integer list". Usually implies clean data but robustness is key.
      const cleaned = token.replace(/\s+/g, "");
      
      if (cleaned.length === 0) continue;

      let val: number | null = null;
      try {
        val = parseInt(cleaned, 10);
      } catch (_) {} // Should not happen with standard JS but safe fallback
      
      if (!val || isNaN(val)) continue; // Skip non-integers or NaN results (e.g. "abc")

      count2++;
      
      if (maxVal2 === null) {
        maxVal2 = val;
      } else {
        if (val > maxVal2) {
          maxVal2 = val;
        }
      }
    } catch (_) {} // Fallback for any unexpected parsing errors
  }

  console.log(`count=${count2} max=${maxVal2}`);
});
