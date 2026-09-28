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

  // 正規表現でチェック: 
  // ^: 行の開始
  // (?:[0-9]+(?:,|$))+: 1つ以上の数字列とカンマの組み合わせ。末尾のカンマも許容する。
  // $ : 行の終わり
  // この正規表現は少し複雑になるため、より直接的に検証する。

  // 妥当性の判定ロジック
  let isValid = false;
  
  // 末尾のカンマを取り除いた文字列をチェック
  const content = trimmedLine.replace(/,$/, '');

  if (content.length === 0) {
    // 行がカンマのみ（例: "," または ",,"）の場合、これは妥当ではない（数字列が1個以上必要）
    // ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」必要がある。
    // 空行は除外済み。
    // 例: "," は数字列がないため不適。
    isValid = false;
  } else {
    // カンマで分割し、各要素が数字のみであることを確認する
    const parts = content.split(',');
    let allAreNumbers = true;
    
    for (const part of parts) {
      if (part.length === 0) {
        // カンマが連続している場合 (例: "1,,2")。これは妥当ではない。
        allAreNumbers = false;
        break;
      }
      if (!/^\d+$/.test(part)) {
        // 数字以外の文字が含まれている場合
        allAreNumbers = false;
        break;
      }
    }

    if (allAreNumbers) {
      // 1個以上の数字列がカンマで区切られているか (parts.length >= 1)
      // content.length > 0 であれば、少なくとも1つの数字列が存在する。
      // ただし、"123" のようにカンマがない場合も許容されるべきか？
      // 仕様: 「1 個以上の数字列がカンマで区切られて並んでいる」
      // "123" はカンマで区切られていないが、数字列が1つある。
      // 厳密に「カンマで区切られている」ことを要求するなら、少なくとも1つのカンマが必要。
      
      // 例: "1,2" -> parts=["1", "2"] (2個の数字列) -> OK
      // 例: "123" -> parts=["123"] (1個の数字列) -> カンマで区切られていない。
      
      // 「末尾のカンマは許容」という条件から、カンマが存在しない場合も許容されると解釈する。
      // 妥当なのは、数字とカンマ以外を含まず、かつ空でない行。
      isValid = true;
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
