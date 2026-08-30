const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換する際、trim() を行わないと "123a" が NaN にされるが、
    // 仕様は「整数として解釈できない要素も無視」なので、安全に解析する必要がある。
    const trimmed = token.trim();
    
    if (!/^-?\d+$/.test(trimmed)) continue;

    let n: number | bigint;
    try {
      // BigInt で処理し、必要に応じて Number に変換 (64bit 範囲内なら OK)
      n = parseInt(trimmed, 10); 
      if (!Number.isFinite(n)) continue;
      
      count++;
      const currentMax = maxVal ?? -Infinity;
      if (n > currentMax) {
        maxVal = n;
      }
    } catch (_) {} // 解析エラーの場合無視（上記 regex でフィルタ済みだが念のため）
    
    // parseInt は文字列から数値への変換なので、BigInt の必要はない。
    // ただし、JavaScript の Number (64bit) が扱える範囲内と指定されているため、parseInt で十分。
  }

  if (!maxVal && count > 0) maxVal = -Infinity; 
  else if (!maxVal) { /* 要素がなかった場合の処理は spec に依存するが、通常は最大値が存在しない */ }
  
  // 修正: maxVal が未設定の場合（空配列など）どうするか。例題では常に出力される想定だが、
  // ここでは count=0 の場合は max を何とするか不明。ただし「整数として解釈できない要素も無視」なので、
  // 少なくとも 1 つの整数が入ることを前提すると安全。もし入らないなら maxVal は undefined が残る。
  
  if (maxVal === -Infinity && count > 0) { /* 最初の値が負無限大より小さい？不可能 */ }

  console.log(`count=${count} max=${maxVal}`);
});
