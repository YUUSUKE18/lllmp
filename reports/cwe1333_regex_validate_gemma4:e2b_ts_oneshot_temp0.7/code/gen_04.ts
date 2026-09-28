process.stdin.on("data", (data: Buffer) => {
  const line = data.toString().trim();
  if (line.length === 0) {
    // 空行は妥当ではない（仕様より）
    return;
  }

  // カンマ区切りとしてパースを試みる
  // 末尾のカンマを考慮し、カンマで分割し、各要素が数字のみで構成されているかチェックする
  // 正規表現でカンマ区切りで数字のみの文字列を抽出する
  const parts = line.split(',');
  let isValid = true;

  // 1. 空行や数字とカンマ以外の文字が含まれていないか確認（このチェックはsplit後の要素で十分）
  // 2. 1個以上の数字列がカンマで区切られているか
  
  // 各部分が数字のみで構成されているか、または空文字列（末尾のカンマなど）であるかを確認
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.length > 0) {
      // 数字のみで構成されているかチェック
      if (!/^\d+$/.test(trimmedPart)) {
        isValid = false;
        break;
      }
    }
  }

  if (isValid) {
    // 1個以上の数字列がカンマで区切られているか（つまり、分割された要素が少なくとも1つあるか）
    // 末尾のカンマが許容されるため、空の要素が複数ある場合（例: "1,,2"）を許容するかどうかを明確にする必要がある。
    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
    // これは、カンマで区切られたときに、数字の塊が存在することを意味する。
    
    // 例: "1,2,3" -> ["1", "2", "3"] (3つの数字列)
    // 例: "1,2," -> ["1", "2", ""] (2つの数字列と1つの空文字列)
    // 例: "," -> ["", ""] (2つの空文字列) -> 不妥当
    // 例: "" -> [""] (1つの空文字列) -> 不妥当 (空行は既に処理済み)

    // 妥当なのは、数字の塊が少なくとも1つ存在する場合。
    let hasNumber = false;
    for (const part of parts) {
        if (part.trim().length > 0) {
            hasNumber = true;
            break;
        }
    }

    if (hasNumber) {
        // 妥当
        process.stdout.write(`valid=1\n`);
    } else {
        // 数字が全く含まれていない（例: "," または ",," など）
        process.stdout.write(`valid=0\n`);
    }
    
  } else {
    // 数字とカンマ以外を含む、または数字列が存在しない
    process.stdout.write(`valid=0\n`);
  }
});
