process.stdin.on("data", (data: Buffer) => {
  const line = data.toString().trim();
  if (line.length === 0) return;

  // カンマ区切りの整数列として解析を試みる
  // 末尾のカンマは許容する
  const parts = line.split(',');

  let isValid = true;

  // 1. 少なくとも1個の数字列が存在するか確認する
  let hasNumber = false;
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.length > 0) {
      const num = parseInt(trimmedPart, 10);
      if (!isNaN(num)) {
        hasNumber = true;
      } else {
        // 数字とカンマ以外を含む場合、妥当ではない
        isValid = false;
        break;
      }
    }
  }

  if (!hasNumber) {
    // 数字が一つも存在しない場合（例: "," や "" のみ）
    isValid = false;
  }

  // 2. 数字とカンマ以外を含む行や、空行でないが数字がない行のチェックを再確認
  // 仕様: 1 個以上の数字列がカンマで区切られて並んでいること。
  // 空行、および数字とカンマ以外を含む行は妥当ではない。

  // 再度、より厳密にチェック
  const actualNumbers = parts
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => parseInt(p, 10))
    .filter(n => !isNaN(n));

  if (actualNumbers.length === 0) {
    // 数字列が一つも存在しない場合（空行、カンマのみ、数字とカンマ以外）
    isValid = false;
  } else {
    // 1個以上の有効な数字列が存在する場合、その行は妥当
    isValid = true;
  }


  // 最終的な出力
  console.log(`valid=${isValid}`);
});
