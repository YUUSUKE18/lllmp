const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    try {
      // parseInt は文字列を整数に変換し、失敗すると NaN を返すため、数値チェックを追加
      const n = Number(f); 
      
      // NaN の場合のみスキップ（"1.5" や "abc" などは変換されず NaN）
      if (Number.isNaN(n)) continue;

      count++;
      
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
    } catch (_) {} // parseInt の例外をキャッチしてスキップ（文字列解析エラーなど）
  }
  
  console.log(`count=${count} max=${maxVal}`);
});
