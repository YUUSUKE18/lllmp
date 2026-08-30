const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line.trim());
  lineNumber++;
});

rl.on('close', () => {
  let validLines = 0;
  for (const line of lines) {
    // 1. 空行チェック
    if (line.length === 0) {
      continue;
    }

    // 2. 数字とカンマ以外を含むかチェック
    // 正規表現で数字とカンマのみで構成されているかを確認する。
    // 末尾のカンマは許容されるため、行全体が数字とカンマのみで構成されているかを確認する。
    // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要がある。

    // 妥当性の判定ロジック:
    // 1. 行が空でないこと (上記でチェック済み)
    // 2. 行が数字とカンマのみで構成されていること。
    // 3. 少なくとも1つの数字列が存在すること。

    // 処理を簡単にするため、行をカンマで分割し、各要素が数字であるかを確認する。
    const parts = line.split(',');
    let hasNumber = false;

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        const num = parseInt(trimmedPart, 10);
        // 数字に変換でき、かつ元の文字列が数字のみ（または数字とカンマのみ）で構成されているかを確認する。
        // ここでは、各要素が有効な整数であるかを確認する。
        if (!isNaN(num)) {
          hasNumber = true;
        } else {
          // 数字とカンマ以外が含まれている場合、この行は妥当ではない
          console.log(`valid=0`); // 妥当でない行が見つかった時点で終了し、0を出力する
          return;
        }
      }
    }

    // 1個以上の数字列がカンマで区切られて並んでいるか (hasNumberがtrue)
    if (hasNumber) {
      validLines++;
    }
  }

  console.log(`valid=${validLines}`);
});
