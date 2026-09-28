const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines: string[] = s.split('\n');
  let validCount = 0;

  for (const line of lines) {
    // 行の前後の空白を無視してチェック
    const trimmedLine = line.trim();

    if (trimmedLine.length === 0) {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切りの整数列として妥当か判定
    // 妥当なのは、カンマで区切られた数字列（空でない）である。
    // 末尾のカンマは許容される。
    
    let isValid = true;
    
    // 末尾のカンマを考慮しつつ、カンマで分割してチェックする
    // 例: "1,2,3," -> ["1", "2", "3", ""]
    const parts = trimmedLine.split(',');
    
    // 全ての要素が数字列（または空文字列、末尾のカンマで生じた空文字列）のみで構成されているかを確認する。
    // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすか。

    // 1. 数字列のみで構成されているかチェック
    for (const part of parts) {
      if (part.length > 0) {
        // 部分が数字のみで構成されているか（カンマ以外の文字が含まれていないか）
        if (!/^\d+$/.test(part)) {
          isValid = false;
          break;
        }
      }
    }

    if (!isValid) {
        continue;
    }

    // 2. 1個以上の数字列がカンマで区切られているか（空でない要素が少なくとも1つあるか）
    // 末尾のカンマがある場合、parts.length はその区切り文字の数より1多くなる。
    // 例: "1,2," -> ["1", "2", ""] (length 3)
    // この場合、実質的なデータは "1", "2" であり、2個以上の数字列が存在する。
    
    // 空でない要素の数を数える
    let actualCount = 0;
    for (const part of parts) {
        if (part.length > 0) {
            actualCount++;
        }
    }

    if (actualCount >= 1) {
        validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
