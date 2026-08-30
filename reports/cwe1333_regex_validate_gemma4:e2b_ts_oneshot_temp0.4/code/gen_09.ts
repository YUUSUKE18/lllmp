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

  // 妥当な行の判定ロジック
  // 1. 数字とカンマ以外を含まないかチェック
  // 2. カンマで区切られているか、またはカンマで終わっているかチェック
  // 3. 1個以上の数字列が存在するかチェック
  
  let isValid = true;
  let hasNumber = false;
  let lastChar = '';

  for (let i = 0; i < trimmedLine.length; i++) {
    const char = trimmedLine[i];

    if (char >= '0' && char <= '9') {
      hasNumber = true;
      lastChar = char;
    } else if (char === ',') {
      // カンマは許容されるが、直後に数字がないと次の数字列の区切りとして機能しない可能性がある
      // 末尾のカンマは許容される
      if (i === trimmedLine.length - 1 || (i + 1 < trimmedLine.length && trimmedLine[i + 1] === ',')) {
        // 末尾のカンマ、または連続するカンマは無視（後で全体として妥当性をチェックするため）
      }
    } else {
      // 数字でもカンマでもない文字
      isValid = false;
      break;
    }
  }

  // 最終チェック: 1個以上の数字列が存在するか
  if (isValid && hasNumber) {
    // 厳密な妥当性の判定: カンマ区切りの整数列であること
    // 妥当な行とは、「1個以上の数字列がカンマで区切られて並んでいること」
    // 末尾のカンマは許容される。
    
    // 複数の数字列が存在するかを確認する
    const parts = trimmedLine.split(',');
    let count = 0;
    for (const part of parts) {
        if (part.trim() !== "") {
            count++;
        }
    }

    if (count >= 1) {
        validLines++;
    }
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
