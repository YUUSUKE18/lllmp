const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    try {
      const n = parseInt(f, 10);
      // NaN の場合のみスキップ（整数として解釈できない要素）
      if (Number.isNaN(n)) continue; 
      
      count++;
      if (first || n > max) {
        max = n;
        first = false;
      }
    } catch (e) {
      // 解析エラーが発生した場合はスキップ（安全策）
      continue;
    }
  }

  console.log(`count=${count} max=${max}`);
});
