const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validCount = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマのみで構成されているか
  // 2. 1個以上の数字列がカンマで区切られているか（末尾のカンマは許容）

  // 正規表現で判定:
  // ^: 行の開始
  // (?:[0-9]+(?:,|$))+ : 1つ以上の数字列とカンマの組み合わせ
  // $ : 行の終了
  // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字列が含まれていることを確認します。
  // 末尾のカンマも許容するため、行全体が数字とカンマのシーケンスで構成されていることを確認します。

  // より厳密に、カンマで区切られた整数列であることを確認します。
  // 1. 行が空でないこと (既にチェック済み)
  // 2. 行に含まれる文字が数字とカンマのみであること
  // 3. 少なくとも1つの数字が含まれていること

  let isValid = false;
  if (trimmedLine.length > 0) {
    // カンマで分割して、各要素が整数であることを確認する
    const parts = trimmedLine.split(',');
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
        hasNumber = true;
      } else if (trimmedPart.length > 0) {
        // 数字以外の文字が含まれていたら不適
        isValid = false;
        break;
      }
    }

    if (isValid && hasNumber) {
      // 妥当な行としてカウント
      validCount++;
    }
  }
});

rl.on('end', () => {
  // 厳密に 1 行だけ出力
  console.log(`valid=${validCount}`);
});
