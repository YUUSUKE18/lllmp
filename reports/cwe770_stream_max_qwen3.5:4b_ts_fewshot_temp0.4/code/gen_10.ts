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
      const n = parseInt(w, 10);
      
      // NaN や Infinity を除外し、有効な整数であるか確認
      if (!Number.isFinite(n) || isNaN(n)) continue;

      count++;
      if (first || n > max) {
        max = n;
        first = false;
      }
    } catch {
      // 解析エラーが発生した場合も無視
      continue;
    }
  }
  
  console.log(`count=${count} max=${max}`);
});
