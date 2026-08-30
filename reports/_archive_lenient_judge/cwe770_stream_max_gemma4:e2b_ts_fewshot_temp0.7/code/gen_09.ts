const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック（NaNチェックと64bit範囲の確認）
    if (!Number.isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 最大値が設定されていない場合（入力が全て無効な値だった場合）、最大値の扱いは問題の文脈に依存するが、
  // 整数列が空でない限り、少なくとも1つの数値は処理されるはず。
  // ここでは、有効な数値が存在する場合のみ出力する。

  console.log(`count=${count} max=${max}`);
});
