const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;

  // カンマで区切って各要素を処理
  const parts = s.split(",");

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (!trimmedPart) continue;

    // ':' で分割して「値:回数」の形式をチェック
    const colonIndex = trimmedPart.indexOf(":");
    if (colonIndex === -1) continue;

    const valueStr = trimmedPart.substring(0, colonIndex).trim();
    const countStr = trimmedPart.substring(colonIndex + 1).trim();

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    // 値と回数が有効な整数であり、回数が0以上であることを確認
    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      // 要素数に加算
      count += count;
      // 合計に加算 (BigIntを使用)
      sum += BigInt(value) * BigInt(count);
    }
  }

  console.log(`count=${count} sum=${sum.toString()}`);
});
