const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lineCount = 0;
let validLines = 0;

rl.on('line', (line) => {
  lineCount++;
  // 行の前後の空白を無視して処理
  const trimmedLine = line.trim();

  // 1. 空行かどうかをチェック
  if (trimmedLine === "") {
    // 空行は妥当ではないが、行数はカウントする
    return;
  }

  // 2. 数字とカンマのみが含まれているかチェック
  // 正規表現: 任意数の数字とカンマのみで構成されているか
  // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」という条件を判定する。
  // ここでは、行全体が「数字とカンマ」で構成されているかをチェックし、
  // さらに「1個以上の数字」が含まれていることを確認する。

  let isValidFormat = true;
  let hasDigits = false;
  let lastWasDigitOrComma = false;

  for (let i = 0; i < trimmedLine.length; i++) {
    const char = trimmedLine[i];
    if (/[0-9]/.test(char)) {
      hasDigits = true;
      lastWasDigitOrComma = true;
    } else if (char === ',') {
      lastWasDigitOrComma = true;
    } else {
      // 数字、カンマ以外が含まれている場合、妥当ではない
      isValidFormat = false;
      break;
    }
  }

  // 末尾のカンマは許容する。
  if (isValidFormat) {
    // 1個以上の数字が含まれているか (例: "," や ",," はダメ、"1," はOK)
    // 実際には、"1" や "1,2", "1,,2" などが条件を満たすかを見る。
    // 「1個以上の数字列がカンマで区切られて並んでいる」
    // これは、カンマで区切られた要素の中に少なくとも1つの数字が含まれていることを意味する。
    
    // 区切り文字 (カンマ) の後に数字が続く、または数字のみで構成されている場合を許容する。
    // 最も厳密な解釈: 少なくとも1つの数字が存在し、カンマや数字以外の文字がないこと。
    
    // 数字が1つ以上含まれていれば妥当とする。（空行は除外済み）
    if (hasDigits) {
      validLines++;
    }
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
