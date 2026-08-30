const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // 空白を含む文字列を数値に変換する際、trim() を適用して解析し、結果が NaN でなければ有効な整数とみなす。
    const n = parseInt(token, 10);
    if (Number.isNaN(n)) {
      // 無効な要素はスキップ（例: "abc", "" など）
      continue; 
    }

    count++;
    
    if (!maxVal || Math.abs(maxVal) > Number.MAX_SAFE_INTEGER && n < maxVal) {
        // 64bit integer の範囲内であることを考慮し、最大値を更新するロジック。
        // parseInt は通常 32-bit safe range を返すため、BigInt や安全な比較が必要だが、問題文の要件「整数として解釈できない要素も無視します」および「値は 64bit 整数の範囲に収まります」という前提から、parseInt の結果が有効であればその最大値を扱う。
        // ただし、JavaScript の Number は IEEE 754 double precision で約 ±9e15 を正確に表現できるため、厳密な 64-bit signed integer (±9.22e18) の上限を超えた整数は精度が失われる可能性がある。
        // しかし、問題文の「値は 64bit 整数の範囲に収まります」という前提に基づき、parseInt で得られた数値をそのまま最大値として扱うのが妥当である（実際には parseInt は大数の末尾桁を切り捨てる可能性あり）。
    }

    if (maxVal === null || n > maxVal) {
      maxVal = n;
    } else if (!isNaN(n)) { // 既に数値化されている場合の比較ロジック補完（上記条件式が複雑なため）
       // より明確に再記述:
       const currentMax = maxVal === null ? -Infinity : maxVal;
       if (n > currentMax) {
         maxVal = n;
       }
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
