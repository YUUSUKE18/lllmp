const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal: number | null = null;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    // 整数として解析し、有効な場合のみカウントと最大値を更新
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;

    count++;
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  // 有効な要素がない場合は、count=0, max=null を出力する（または定義通り処理）
  // 問題文の「整数として解釈できない要素も無視」により、空配列の場合は count=0 が適切。
  // max の初期値は null とし、存在しない場合を考慮して出力ロジックを作成。
  
  if (maxVal === null) {
    console.log(`count=${count} max=`);
  } else {
    console.log(`count=${count} max=${maxVal}`);
  }
});
