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
  // 1. 数字とカンマ以外を含まないか
  // 2. 1個以上の数字列がカンマで区切られているか
  // 3. 末尾のカンマは許容されるか

  // 正規表現で検証: 
  // ^: 行の開始
  // (?:[0-9]+(?:,|$))+: 1つ以上の数字列とカンマの組み合わせ (数字列の後にカンマまたは行末)
  // $ : 行の終了
  // この正規表現は少し複雑になるため、より直接的に検証します。

  let isValid = false;
  
  // 末尾のカンマを取り除いて、カンマで分割してみる
  let parts = trimmedLine.split(',');
  
  if (parts.length === 0) {
    // これは空行で既に除外されているはずだが念のため
    isValid = false;
  } else {
    // 各部分が数字のみで構成されているかチェックし、少なくとも1つ数字が含まれているかチェックする
    let hasDigits = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
        hasDigits = true;
      } else if (trimmedPart.length > 0) {
        // 数字とカンマ以外を含む場合
        isValid = false;
        break;
      }
    }
    
    if (hasDigits) {
        // 少なくとも1つの数字列が存在し、カンマ区切りで構成されている
        isValid = true;
    } else if (parts.length === 1 && /^\d+$/.test(trimmedLine)) {
        // カンマなしの単一の整数列も妥当と見なすか？
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
        // 単一の数字列は「1個の数字列がカンマで区切られている」と解釈できるか？
        // 例: "123" -> parts=["123"]. 1個の数字列。
        // 厳密には「カンマで区切られている」必要があるため、カンマが少なくとも1つあるか、または数字列が複数ある必要がある。
        // ただし、「末尾のカンマは許容」という記述があるため、カンマがない場合も許容範囲か？
        // 「1 個以上の数字列がカンマで区切られて並んでいる」を満たすには、カンマが少なくとも1つ必要。
        // 例: "1,2" (2個の数字列)
        // 例: "1" (1個の数字列)
        // 曖昧さを避けるため、"カンマで区切られている"ことを重視し、カンマが存在しない場合は妥当としない、と解釈する。
        // しかし、例1の仕様では「カンマ区切りの整数列」が前提。
        // 妥当なケースを「カンマを含む」と厳密に解釈し、カンマがない場合は不妥当とする。
        
        // 再評価: 「1 個以上の数字列がカンマで区切られて並んでいる」
        // "1,2" -> 2個の数字列, カンマで区切られている -> 妥当
        // "123" -> 1個の数字列, カンマで区切られていない -> 不妥当（厳密な解釈）
        
        if (parts.length > 1 || (parts.length === 1 && trimmedLine.includes(','))) {
             // カンマが含まれている場合、または複数の要素がある場合
             isValid = true;
        } else {
             // カンマがなく、要素が1つしかない場合 (例: "123")
             // このケースを妥当とするか否かは仕様依存。ここでは「カンマによる区切り」を必須とする。
             isValid = false;
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
