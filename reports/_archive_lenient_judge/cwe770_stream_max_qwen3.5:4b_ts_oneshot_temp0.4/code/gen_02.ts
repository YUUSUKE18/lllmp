const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | undefined;
  
  // カンマ区切りで分割し、空白を除去して処理する
  for (const part of s.split(/[,]+/)) {
    if (!part.trim()) continue;
    
    const n = parseInt(part.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue; // 無効な要素をスキップ
    
    count++;
    if (maxVal === undefined || n > maxVal) {
      maxVal = n;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
