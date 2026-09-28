const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let totalCount = 0;
  let totalSum = 0;

  // カンマで区切られた各要素を処理
  const parts = s.split(',');

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    // 値:回数の形式でパース
    const colonIndex = trimmedPart.indexOf(':');
    if (colonIndex === -1) continue;

    const valueStr = trimmedPart.substring(0, colonIndex);
    const countStr = trimmedPart.substring(colonIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    // 値が数値であり、回数が0以上であることを確認
    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      // 値を 'count' 回繰り返す
      totalCount += count;
      totalSum += value * count;
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
