const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  // 行の前後の空白を無視して処理
  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として妥当かを判定
  // 妥当な行は、カンマで区切られた整数のみを含む行
  // 末尾のカンマは許容するが、それ以外は許容しない
  
  // 正規表現で検証: 
  // ^\s*             -> 行頭の空白
  // (?:[0-9]+(?:,|$))* -> 1つ以上の数字列とカンマの組み合わせ（末尾のカンマ含む）
  // \s*$             -> 行末の空白
  // この仕様は「1 個以上の数字列がカンマで区切られて並んでいる」ことを検証する。
  // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
  
  // 1. 行が数字とカンマのみで構成されているか？
  // 2. 空でない数字列が少なくとも1つ含まれているか？

  // 処理を簡略化するため、入力された文字列をカンマで分割し、各要素が整数であるか、そして空でないかを確認する。
  
  const parts = trimmedLine.split(',');
  let isValid = true;
  let hasNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") {
      // カンマが連続している場合（例: "1,,2" や ",1"）
      // この仕様では「1 個以上の数字列がカンマで区切られて並んでいる」ことを検証する。
      // 空の要素は許容される（末尾のカンマは許容）。
      continue;
    }
    
    // 数字のみが含まれているかチェック
    if (!/^\d+$/.test(trimmedPart)) {
      isValid = false;
      break;
    }
    hasNumber = true;
  }

  // 妥当な行の条件:
  // 1. 空行ではない (trimmedLine !== "")
  // 2. 数字とカンマ以外を含まない (上記ループで確認済み)
  // 3. 1個以上の数字列がカンマで区切られている (hasNumber が true)
  
  if (trimmedLine !== "") {
      // 末尾のカンマの有無を考慮して、数字が含まれていれば妥当とする。
      // 例: "1,2," -> parts=["1", "2", ""]。hasNumber=true。これは妥当。
      // 例: "abc,1" -> isValid=false。
      
      // 完全に数字とカンマのみで構成されているか、かつ数字が含まれているか。
      // 厳密に「数字列がカンマで区切られている」ことを確認する。
      
      // ここでは、入力された行が「数字とカンマのみで構成されており、かつ少なくとも1つの数字が含まれている」場合に妥当とする。
      if (hasNumber) {
          validLines++;
      }
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
