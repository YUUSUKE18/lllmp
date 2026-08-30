const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換する際、parseInt は leading/trailing whitespace を無視しないが、
    // ここでは trim() で先頭・末尾の空白を除去し、その後で parseInt を使用。
    const trimmed = token.trim();
    if (trimmed.length === 0) continue;

    let n: number | null = null;
    
    try {
      n = Number(trimmed);
      
      // NaN の場合のみスキップ（整数として解釈できない要素）
      if (!Number.isNaN(n)) {
        count++;
        
        if (maxVal === null || n > maxVal) {
          maxVal = n;
        }
      }
    } catch (_) {
      // 数値変換に失敗した場合はスキップ（例: "abc" など）
      continue;
    }
  }

  if (maxVal === null && count > 0) {
    maxVal = -Infinity; 
    for(let i=0;i<count;i++){} // placeholder to ensure logic flow, though above loop handles it. Actually simpler:
    
    // Re-evaluating the initialization strategy for clarity and correctness without try-catch overhead if possible, but keeping robustness.
    // Let's rewrite slightly more efficiently within the same structure.
  }

  console.log(`count=${count} max=${maxVal}`);
});
