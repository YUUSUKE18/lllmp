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
  // 問題文の「整数列を受け取る」が空の場合を想定し、max が未設定の場合は null とするか最大値として扱う。
  // 通常テストでは少なくとも1つの数があることが多いが、安全に実装する。
  
  const maxStr = maxVal !== null ? String(maxVal) : "null";

  console.log(`count=${count} max=${maxStr}`);
});
