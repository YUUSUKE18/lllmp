const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token, 10);
      
      // NaN や非数値の場合はスキップ（parseInt が期待通り動作するか確認のため）
      if (Number.isNaN(n) || !isFinite(n)) continue;

      count++;
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
    } catch (_) {
      // 解析エラーが発生した場合はスキップ（例：文字列が整数でない場合）
      continue;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
