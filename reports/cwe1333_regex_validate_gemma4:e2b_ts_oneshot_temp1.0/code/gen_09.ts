const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineCount = 0;
let validCount = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 妥当な行の判定ロジック
  // 1. 数字とカンマのみで構成されているか
  // 2. 1個以上の数字列がカンマで区切られているか（末尾のカンマは許容）
  
  // 妥当性のチェック：
  // 1. 数字とカンマ以外を含む行は妥当ではない。
  // 2. 少なくとも1つの数字列が存在し、それがカンマで区切られている。
  
  // 正規表現でチェックする
  // \d* : 0個以上の数字
  // , : カンマ
  // ^.*$ : 行全体が数字とカンマのみで構成されているか（行の前後空白はtrimで処理済み）
  // \d+ : 少なくとも1つの数字列があることを保証するため、少なくとも1つの数字が存在する必要がある。

  // 妥当な行の定義を厳密に解釈する:
  // 「1 個以上の数字列がカンマで区切られて並んでいる」
  // 「末尾のカンマは許容する」

  // 例: "1,2,3" -> OK
  // 例: "1,2," -> OK
  // 例: "1" -> OK (1個の数字列)
  // 例: "," -> NG (数字列が0個)
  // 例: "abc" -> NG (数字とカンマ以外を含む)
  // 例: "1a" -> NG (数字とカンマ以外を含む)

  let isValid = false;
  
  // カンマで分割し、各要素が数字のみで構成されているか確認する
  const parts = trimmedLine.split(',');
  
  if (parts.length > 0) {
    // 末尾のカンマが許容されるため、最後の要素が空でもOKとする。
    // 例: "1,2," -> parts=["1", "2", ""]
    // 妥当なのは、少なくとも1つの非空の数字列が存在し、それらがカンマで区切られていること。
    
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        // 数字列であるかチェック
        if (/^\d+$/.test(trimmedPart)) {
          hasNumber = true;
        } else {
          // 数字とカンマ以外を含む行（例: "1a"）は妥当ではない
          isValid = false;
          break;
        }
      }
    }

    if (hasNumber) {
      // 1個以上の数字列がカンマで区切られている (空行以外で、数字が含まれている)
      isValid = true;
    } else if (parts.length === 1 && /^\d+$/.test(trimmedLine)) {
        // カンマなしの数字のみの行も、1個の数字列として妥当とみなす (仕様上、カンマ区切りの場合のみ厳密に問われているが、ここでは"1"も許容する)
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」という条件を重視する。
        // 1個の数字列は「1個の数字列がカンマで区切られて並んでいる」と解釈する。
        isValid = true;
    } else {
        // 数字列が一つも存在しない場合（例: "," や "" は既に除外済み）
        isValid = false;
    }
  } else {
    // これは空行（すでにチェック済みだが念のため）
    isValid = false;
  }

  if (isValid) {
    validCount++;
  }
  
  lineCount++;
});

rl.on('close', () => {
  console.log(`valid=${validCount}`);
});
