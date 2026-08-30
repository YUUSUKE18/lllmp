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
    
    // 最大値を更新（最初の要素が null であれば、それ以降のすべての整数は有効とみなすため比較可能にする必要があるか？ 
    // ただし仕様では「64bit 整数」とあり、parseInt は大域的に動作するため、初期化を考慮する。
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
