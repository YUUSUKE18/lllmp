const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validLines = 0;
  for (const line of lines) {
    // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      // 空行は妥当ではない
      continue;
    }

    // カンマ区切りの整数列として解析を試みる
    const parts = trimmedLine.split(',');
    let isValid = true;

    // 1. 数字とカンマ以外を含むかチェック
    for (const part of parts) {
      // 数字のみ（または空文字列、末尾のカンマに対応）であることを確認
      if (part.trim() === "") {
        // 末尾のカンマや連続するカンマに対応するため、空文字列は許容する
        continue;
      }
      if (!/^\d+$/.test(part)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      // 2. 1個以上の数字列がカンマで区切られて並んでいるかチェック
      // 実際には、splitの結果が空でない要素を含んでいればOK。
      // ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいること」が妥当。
      // これは、少なくとも1つの数字が含まれている必要があることを意味する。
      
      // 厳密に「1個以上の数字列」が区切られているかを確認する。
      // 連続するカンマや前後の空白を考慮して、数字の塊が少なくとも1つ存在するか確認する。
      
      // 既に数字のみで構成されていることを確認した上で、
      // 少なくとも1つの数字が含まれているかを確認する。
      const numbers = parts.map(p => p.trim()).filter(p => p.length > 0);
      
      if (numbers.length >= 1) {
        validLines++;
      } else {
        // 数字が一つも含まれていない場合（例: "," や ",," のみ）
        isValid = false;
      }
    }

    if (isValid) {
      // 妥当な行としてカウント
    }
  }

  console.log(`valid=${validLines}`);
});
