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

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマのみで構成されているか
  // 2. 1個以上の数字列がカンマで区切られているか（末尾のカンマは許容）

  // 正規表現で検証:
  // ^: 行の開始
  // (?:[0-9]+(?:,|$))+: 1つ以上の数字列とカンマの組み合わせ。
  //   [0-9]+: 1つ以上の数字
  //   (?:,|$) : カンマまたは行末
  // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認するのに役立ちます。

  // より厳密に、カンマで区切られた整数列であることを確認します。
  // 1. 行が空でないこと (既にチェック済み)
  // 2. 行が数字とカンマのみで構成されていること
  // 3. 少なくとも1つの数字が含まれていること

  let isValid = false;
  if (trimmedLine.length > 0) {
    // 末尾のカンマを無視して、カンマで区切られた数字列が存在するか確認する
    // 例: "1,2,3," -> "1,2,3"
    const contentWithoutTrailingComma = trimmedLine.endsWith(',') ? trimmedLine.slice(0, -1) : trimmedLine;

    // カンマで分割し、各要素が整数であるか確認
    const parts = contentWithoutTrailingComma.split(',');
    let hasDigits = false;

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
          hasDigits = true;
        } else {
          // 数字以外の文字が含まれていた場合、妥当ではない
          isValid = false;
          break;
        }
      }
    }

    if (hasDigits) {
      // 少なくとも1つの数字が含まれていれば妥当
      isValid = true;
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
