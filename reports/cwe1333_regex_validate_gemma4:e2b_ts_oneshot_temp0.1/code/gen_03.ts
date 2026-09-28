const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 妥当性の判定ロジック
  // 1. 数字とカンマ以外を含まないか
  // 2. 1個以上の数字列がカンマで区切られているか（末尾のカンマは許容）

  // 正規表現で検証:
  // ^: 行の開始
  // (?:[0-9]+(?:,[0-9]+)*): 1つ以上の数字とカンマの組み合わせ（数字が1つ以上）
  // (?:,|$): カンマまたは行末
  // $ : 行の終了
  // このロジックは複雑になるため、より直接的に「カンマ区切りの整数列」の構造をチェックします。

  // 妥当な行の定義:
  // 1. 数字とカンマのみで構成されていること。
  // 2. 少なくとも1つの数字が含まれていること。
  // 3. 末尾のカンマは許容されること。

  let isValid = false;
  if (trimmedLine.length > 0) {
    // 末尾のカンマを取り除いて、カンマで分割してみる
    let parts = trimmedLine.split(',');
    
    // 最後の要素が空文字列（末尾のカンマがあった場合）
    if (parts.length > 0 && parts[parts.length - 1] === "") {
      // 末尾のカンマがある場合、それ以前の要素が数字のみで構成されているか確認
      const contentWithoutTrailingComma = trimmedLine.substring(0, trimmedLine.length - 1);
      if (contentWithoutTrailingComma.length > 0) {
        const actualParts = contentWithoutTrailingComma.split(',');
        let allAreNumbers = true;
        for (const part of actualParts) {
          if (!/^\d+$/.test(part)) {
            allAreNumbers = false;
            break;
          }
        }
        if (allAreNumbers && actualParts.length >= 1) {
          isValid = true;
        }
      }
    } else {
      // 末尾のカンマがない場合
      const actualParts = trimmedLine.split(',');
      if (actualParts.length > 0) {
        let allAreNumbers = true;
        for (const part of actualParts) {
          if (!/^\d+$/.test(part)) {
            allAreNumbers = false;
            break;
          }
        }
        if (allAreNumbers && actualParts.length >= 1) {
          isValid = true;
        }
      }
    }
  }

  // より簡潔な判定（数字とカンマのみで構成され、少なくとも1つの数字が含まれているか）
  // 妥当な行は、数字とカンマのみで構成され、空行でないこと。
  // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
  
  // 最終的な判定ロジックを再構築:
  // 行が数字とカンマのみで構成されているか、かつ、少なくとも1つの数字が含まれているか。
  
  let finalIsValid = false;
  if (trimmedLine.length > 0) {
      // 数字とカンマ以外の文字が含まれていないかチェック
      if (/^[\d,]*$/.test(trimmedLine)) {
          // 少なくとも1つの数字が含まれているかチェック
          if (/\d/.test(trimmedLine)) {
              // カンマ区切りとして妥当であると見なす（末尾のカンマも許容されるため）
              finalIsValid = true;
          }
      }
  }


  if (finalIsValid) {
    validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
