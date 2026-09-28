const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    // Leading/trailing whitespace を除去し、整数として解析する
    const trimmed = f.trim();
    const n = parseInt(trimmed);
    
    // NaN の場合は無視（例: "abc", "" など）
    if (Number.isNaN(n)) continue;
    
    count++;
    
    // 最大値を更新（最初の要素が null の場合、または現在の値の方が大きい場合）
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }
  
  console.log(`count=${count} max=${maxVal}`);
});
