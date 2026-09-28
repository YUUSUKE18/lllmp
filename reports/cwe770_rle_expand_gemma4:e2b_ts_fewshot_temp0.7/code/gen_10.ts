const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let sum = 0n; // 合計値は64bit整数で扱うためBigIntを使用
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const colonIndex = trimmedPart.indexOf(":");
    if (colonIndex === -1) {
      isValid = false;
      break;
    }

    const valueStr = trimmedPart.substring(0, colonIndex);
    const countStr = trimmedPart.substring(colonIndex + 1);

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    if (Number.isNaN(value) || Number.isNaN(count) || count < 0) {
      isValid = false;
      break;
    }

    if (count > 0) {
      count += value * count;
      sum += BigInt(value) * BigInt(count);
      count += count; // 要素数の計算（要素数 = 回数）
    }
  }

  if (isValid) {
    // 求められているのは「要素数」と「合計」
    // 要素数: 各値が何回出現したかの合計 (回数の合計)
    // 合計: 全要素の合計 (値 * 回数 の合計)
    // 仕様の解釈:
    // 「7:3,2:2」は 7,7,7,2,2 という整数列
    // 要素数 = 5
    // 合計 = 7+7+7+2+2 = 25
    
    // 修正された計算ロジック:
    // 要素数 = 各値の回数の合計 (これは例の「7, 2」の合計回数)
    // 合計 = 各値 * その回数 の合計
    
    let totalCount = 0;
    let totalSum = 0n;

    const rawParts = s.split(",");
    for (const part of rawParts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const colonIndex = trimmedPart.indexOf(":");
        if (colonIndex === -1) continue;

        const value = parseInt(trimmedPart.substring(0, colonIndex), 10);
        const count = parseInt(trimmedPart.substring(colonIndex + 1), 10);

        if (!Number.isNaN(value) && !Number.isNaN(count) && count >= 0) {
            totalCount += count;
            totalSum += BigInt(value) * BigInt(count);
        }
    }


    console.log(`count=${totalCount} sum=${totalSum}`);
  }
});
