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
  // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

  // 正規表現でチェック: 数字とカンマのみで構成され、少なくとも1つの数字が含まれているか
  // ^[0-9,]*$ : 数字とカンマのみ
  // (?:[0-9]+(?:,|$))+ : 1つ以上の数字列とカンマの組み合わせ
  // $ : 行の終わり
  
  // より厳密に、カンマで区切られた整数列の形式をチェックする
  // 1. 行が空でないこと (既にチェック済み)
  // 2. 行が数字とカンマのみで構成されていること
  // 3. 数字列がカンマで区切られていること (末尾のカンマは許容)

  // 処理を簡略化し、指定された条件を満たすかを確認する
  
  let isValid = false;
  
  // 行をカンマで分割し、各要素をチェック
  const parts = line.split(',');
  
  if (parts.length > 0) {
    let hasNumbers = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") {
        // 空の要素は許容される（カンマの連続や末尾のカンマに対応するため）
        continue;
      }
      
      // 数字のみが含まれているかチェック
      if (/^\d+$/.test(trimmedPart)) {
        hasNumbers = true;
      } else {
        // 数字とカンマ以外が含まれている場合、妥当ではない
        isValid = false;
        break;
      }
    }
    
    if (isValid && hasNumbers) {
        // 少なくとも1つの数字が含まれていれば妥当
        validLines++;
    }
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
