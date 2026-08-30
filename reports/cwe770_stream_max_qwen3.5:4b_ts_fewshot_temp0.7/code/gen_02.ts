const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max: number | null = null;
  
  for (const part of s.split(",")) {
    if (/^\s*$/.test(part.trim())) continue; // 空要素や空白のみは無視
    
    const trimmedStr = part.trim();
    
    try {
      const n = parseInt(trimmedStr, 10);
      
      if (!Number.isNaN(n) && isFinite(n)) {
        count++;
        if (max === null || n > max) {
          max = n;
        }
      } else {
        // Invalid integer interpretation ignored as per spec? 
        // Spec says "整数として解釈できない要素も無視します"
        continue;
      }
    } catch (_) {
      // Additional safety for parseInt edge cases if needed, though usually safe.
      continue;
    }
  }

  console.log(`count=${count} max=${max}`);
});
