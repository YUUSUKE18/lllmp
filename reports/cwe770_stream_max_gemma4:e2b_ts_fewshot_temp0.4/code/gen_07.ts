const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let validCount = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック（NaNでないこと、そして元の文字列が数値のみで構成されていることを確認するため、ここでは単純にparseIntの結果をチェックする）
    if (!Number.isNaN(num)) {
      validCount++;
      const n = Number(trimmedPart); // 再度数値として評価
      if (n > max) {
        max = n;
      }
    }
  }

  // 整数として解釈できた要素の数と最大値を計算する（仕様に合わせて、入力されたカンマ区切りの値すべてを考慮する必要がある）
  // 再度、より厳密に「整数として解釈できた要素」のみをカウントし、その最大値を求める。

  let finalCount = 0;
  let finalMax = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = Number(trimmedPart); // parseFloatやparseIntではなく、文字列が数値であるかを確認するためNumber()を使用し、NaNチェックを行う。
    
    // 厳密に整数として解釈できるか確認する（小数点以下がないことを保証するため）
    if (!isNaN(num) && Number.isInteger(num)) {
        finalCount++;
        if (num > finalMax) {
            finalMax = num;
        }
    }
  }

  console.log(`count=${finalCount} max=${finalMax}`);
});
