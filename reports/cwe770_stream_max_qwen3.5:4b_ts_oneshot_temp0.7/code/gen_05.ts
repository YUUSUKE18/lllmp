const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const f of s.split(",")) {
    if (!f.trim()) continue; // カンマ区切りなので、空白のみは飛ばす。ただし要素数が増えるか増えないかは「整数として解釈できる」かどうかで決める。
    
    const trimmed = f.trim();
    let n: number | null = null;

    try {
      if (!/^-?\d+$/.test(trimmed)) continue; // 純粋な正負の整数であることを確認（例：+123 は OK, abc は NG）
      // Node.js の parseInt も同様の挙動だが、Regex で厳密にチェックすることで安全かつ高速。
      n = Number.parseInt(trimmed); 
    } catch {
       continue;
    }

    if (n === null || isNaN(n)) continue;

    count++;
    
    let currentMax: number | undefined = maxVal ?? -Infinity; // 最初の要素を基準にするか、-Infinity から比較する。64bit integer の範囲なので安全。しかし「最大値」の定義として、空の場合はどうするか？仕様は整数列を受け取るので、少なくとも1個あると想定または初期化が必要。
    
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    } else if (!isNaN(n)) { // 既に最初の要素が負の数であっても OK. -Infinity を使うと常に更新される。
       if (n > maxVal) {
         maxVal = n;
       }
    } 
    // 少しコード整理: maxVal が null の場合、その値を最大値とするのが最も自然。

    // 再書き換え（ロジックの明確化）：
    /*
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
    */ 
    // ただし最初の要素が負の数の場合、-10 を取った後に -5 が来たら更新される。これは正しい。

  }

  console.log(`count=${count} max=${maxVal ?? "N/A"}`);
});
