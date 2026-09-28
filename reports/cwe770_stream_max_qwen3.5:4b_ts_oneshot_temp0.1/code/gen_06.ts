const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    // 空白を含む文字列を数値に変換し、エラーが発生するかチェックする
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;

    count++;
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
