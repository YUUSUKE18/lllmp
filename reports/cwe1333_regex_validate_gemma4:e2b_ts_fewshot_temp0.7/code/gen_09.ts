const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines = 0;
let validLines = 0;

rl.on('line', (line) => {
  lines++;
  // 行の前後の空白を無視して判定
  const trimmedLine = line.trim();

  // 1. 空行または数字とカンマ以外を含む行は妥当ではない
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 2. 数字とカンマのみを含むか、または数字列がカンマで区切られているかを確認する
  // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
  // 末尾のカンマは許容される。

  // 正規表現で、カンマで区切られた整数のみが存在するかをチェックする
  // (^\s*(\d+(,\d+)*)\s*$) のような複雑なパターンよりも、
  // 「数字とカンマ以外を含む」という制約を厳密に適用する。

  // 妥当な行の判定ロジック:
  // 行が数字とカンマ（および空白）のみで構成されており、少なくとも1つの数字が含まれているか。
  // 末尾のカンマは許容される。

  // 1. 行からカンマを取り除き、残りが数字のみになるか、または数字とカンマのみになるかを確認する
  let isValid = false;
  
  // 末尾のカンマを取り除く
  let processedLine = trimmedLine;
  if (processedLine.endsWith(',')) {
    processedLine = processedLine.slice(0, -1);
  }
  
  // カンマで分割し、各要素が整数のみであるかを確認する
  const parts = processedLine.split(',');
  let allPartsAreIntegers = true;
  let hasDigits = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") {
        // カンマが連続している場合（例: "1,,2" や末尾のカンマ処理で生じた空文字列）
        // この問題の仕様では「1個以上の数字列がカンマで区切られて並んでいること」が重要。
        // 空の要素が存在しても、数字列が区切られていればOKとする。
        continue;
    }

    // 数字のみであるかチェック
    if (!/^\d+$/.test(trimmedPart)) {
        allPartsAreIntegers = false;
        break;
    }
    hasDigits = true;
  }

  // 妥当な行の条件: 
  // 1. 少なくとも1つの数字が含まれていること (hasDigits === true)
  // 2. 全ての要素が数字のみで構成されていること (allPartsAreIntegers === true)
  // 3. 元の行が空行でないこと (これは既にチェック済み)
  
  // 仕様の解釈に基づき、最も厳しい制約（数字とカンマ以外を含まないこと）を適用する。
  // 「空行、および数字とカンマ以外を含む行は妥当ではありません。」
  // これは、行が数字、カンマ、空白のみで構成されていることを意味する。

  let containsInvalidChars = false;
  for (const char of line) {
      if (!/\d|,|\s/.test(char)) {
          containsInvalidChars = true;
          break;
      }
  }

  if (containsInvalidChars) {
      // 数字、カンマ、空白以外が含まれていたら無効
      return;
  }
  
  // カンマ区切りの整数列の妥当性チェック
  // 末尾のカンマは許容される。
  
  // 少なくとも1つの数字が含まれている必要がある（空行は除外済み）
  if (hasDigits) {
      validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
