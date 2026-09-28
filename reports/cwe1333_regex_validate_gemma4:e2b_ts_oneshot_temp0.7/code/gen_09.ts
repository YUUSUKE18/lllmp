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

  // 正規表現で、数字とカンマのみで構成されているかを確認する
  // 1個以上の数字とカンマの組み合わせ。末尾のカンマも許容する。
  // 例: "1,2,3" や "1,2," や "1," など
  // 厳密には、数字とカンマが交互に並ぶ、または数字がカンマで区切られていることを確認する。
  // ここでは「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすかを確認する。

  // 妥当性の判定ロジック:
  // 1. 行が空でないこと (既にチェック済み)
  // 2. 行に含まれる文字が数字とカンマのみであること。
  // 3. 少なくとも1つの数字が含まれていること。

  const content = trimmedLine;
  let isValid = false;

  // 末尾のカンマを無視して、カンマ区切りの数字列が存在するかを確認する
  // 行全体をカンマで分割し、各要素が数字であるかを確認する。
  const parts = content.split(',');

  if (parts.length > 0) {
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
        hasNumber = true;
      }
    }

    // 1個以上の数字列がカンマで区切られて並んでいること
    // 空白や数字とカンマ以外の文字が含まれていないこと
    // 末尾のカンマは許容されるため、最後の要素が空でも問題ない。
    if (hasNumber) {
      // 数字とカンマ以外が含まれていないか再確認
      let containsInvalidChars = false;
      for (const char of content) {
        if (!/\d|-|\s|,/.test(char)) {
          containsInvalidChars = true;
          break;
        }
      }
      if (!containsInvalidChars) {
        isValid = true;
      }
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
