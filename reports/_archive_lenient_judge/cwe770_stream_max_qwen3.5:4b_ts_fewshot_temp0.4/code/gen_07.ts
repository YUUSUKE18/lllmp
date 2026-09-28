const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;
  
  for (const str of s.split(",")) {
    if (!str.trim()) continue;
    
    // 空白を含む文字列を先頭から末尾まで切り取る（trim() は内部で空白除去を行う）
    const trimmedStr = str.trim(); 
    let n: number | null = null;
    try {
      n = parseInt(trimmedStr, 10);
      if (!Number.isNaN(n)) count++; else continue; // 整数でない場合は無視
      
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
    } catch (_) {} 
  }

  console.log(`count=${count} max=${maxVal}`);
});
