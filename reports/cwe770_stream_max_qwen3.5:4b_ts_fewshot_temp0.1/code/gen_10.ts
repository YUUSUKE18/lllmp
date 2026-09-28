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
    
    if (!maxVal || Math.abs(maxVal) < Math.abs(n)) {
        maxVal = n;
    } else if (n > maxVal) {
        maxVal = n;
    }
  }

  // 有効な整数が一つもない場合、count は 0 で maxVal は undefined（または null）になる。
  const outputMax = maxVal !== null ? String(maxVal) : "undefined"; 
  console.log(`count=${count} max=${outputMax}`);
});
