const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;

  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    
    try {
      const n: number = parseInt(w, 10);
      
      // 整数として解釈できない場合はスキップ（解析が成功した前提）
      if (!Number.isNaN(n) && Number.isFinite(n)) {
        count++;
        
        if (first || n > max) {
          max = n;
          first = false;
        }
      }
    } catch (_) {
      // 解析失敗はスキップ（今回は parseInt で NaN に戻ると判断済み）
    }
    
    // 初期化を安全にするため、count が 0 の場合も max を更新するロジックを考慮
    if (max === Number.MIN_SAFE_INTEGER && count > 0) {
      first = false;
    }
  }

  console.log(`count=${count} max=${Number.isFinite(max) ? max : "N/A"}`);
});
