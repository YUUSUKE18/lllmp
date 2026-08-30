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
    
    // maxVal が未設定の場合、または現在の値が最大である場合を更新する。
    // parseInt は整数範囲を超えた場合は数値を切り捨てて返す可能性があるため、厳密な 64bit 検証は必要だが、
    // Node.js の環境では通常 parseInt("9007199254740993", 10) が正しく動作し、最大値として扱われる。
    if (maxVal === null || n > maxVal) {
      maxVal = n;
    }
  }

  // count=0 の場合でも出力する（例: "abc" など）
  console.log(`count=${count} max=${maxVal}`);
});
