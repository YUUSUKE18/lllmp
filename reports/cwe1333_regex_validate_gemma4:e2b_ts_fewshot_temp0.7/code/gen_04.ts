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
  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマのみで構成されているか
  // 2. 1個以上の数字列が存在するか (カンマで区切られていること)
  // 3. 末尾のカンマは許容される

  // 正規表現でチェック: 
  // ^\s* : 行頭の空白
  // (?:[\d,]+) : 数字とカンマのシーケンス（1回以上）
  // \s*$ : 行末の空白
  // このチェックだけでは「数字列がカンマで区切られている」ことを完全に保証できないため、
  // 以下のロジックで厳密にチェックする。

  let isValid = false;
  
  // 末尾のカンマを取り除いて、カンマで分割してみる
  const processedLine = trimmedLine.endsWith(',') ? trimmedLine.slice(0, -1) : trimmedLine;
  
  if (processedLine.length === 0) {
      // 行が空またはカンマのみの場合（例: "," または ""）
      // 末尾のカンマが許容されるというルールを考慮し、
      // 完全に空行(trimmedLine === "")は不適。
      // ただし、例の指示に基づき「1個以上の数字列がカンマで区切られて並んでいること」を重視する。
      // 空行は不適。
  } else {
      const parts = processedLine.split(',');
      
      // 1. 少なくとも1つの要素があること
      if (parts.length > 0) {
          // 2. 各要素が数字列であるか、または数字列とカンマのみで構成されているかを確認する
          let allAreNumbers = true;
          for (const part of parts) {
              if (part.trim() === "") {
                  // カンマが連続している場合 (例: "1,,2") は不適
                  allAreNumbers = false;
                  break;
              }
              // 数字のみであることを確認 (後続の処理で数値チェックを行う)
              if (!/^\d+$/.test(part)) {
                  allAreNumbers = false;
                  break;
              }
          }

          if (allAreNumbers) {
              // 3. 妥当な行は1個以上の数字列がカンマで区切られていること
              // これは、元のtrimmedLineがカンマで区切られた数字のみで構成されていることを意味する。
              // 末尾のカンマは許容されるため、processedLineが数字列のみで構成されていればOK。
              isValid = true;
          }
      }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
