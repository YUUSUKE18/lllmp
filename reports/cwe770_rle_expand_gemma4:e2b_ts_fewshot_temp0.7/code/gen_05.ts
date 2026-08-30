const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let totalCount = 0;
  let totalSum = 0;

  // カンマで区切って各要素を処理
  const parts = s.split(',');

  for (const part of parts) {
    if (!part.trim()) continue;

    const partsArr = part.split(':');
    if (partsArr.length !== 2) continue;

    const valueStr = partsArr[0].trim();
    const countStr = partsArr[1].trim();

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    // 値と回数が有効な整数であり、回数が0以上であることを確認
    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      // 値を count 回加算
      totalSum += value * count;
      // 要素数は count だけ加算
      totalCount += count;
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
