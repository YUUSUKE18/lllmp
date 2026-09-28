process.stdin.setEncoding("utf8");
let validCount = 0;

process.stdin.on("data", (data: string) => {
  const line = data.trim();

  if (line === "") {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として妥当か判定
  // 妥当な形式: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
  
  // 1. 末尾のカンマを取り除く
  let processedLine = line;
  if (processedLine.endsWith(',')) {
    processedLine = processedLine.slice(0, -1);
  }

  // 2. カンマで分割
  const parts = processedLine.split(',');

  let isValid = false;
  if (parts.length > 0) {
    // 全ての要素が数字のみで構成されているか確認
    const allAreNumbers = parts.every(part => {
      // 空文字列でないこと、かつ数字のみであることを確認
      if (part === "") return false;
      return /^\d+$/.test(part);
    });

    if (allAreNumbers) {
      // 1個以上の数字列がカンマで区切られている (parts.length >= 1)
      isValid = true;
    }
  }

  if (isValid) {
    validCount++;
  }
});

process.stdin.on("end", () => {
  console.log(`valid=${validCount}`);
});
