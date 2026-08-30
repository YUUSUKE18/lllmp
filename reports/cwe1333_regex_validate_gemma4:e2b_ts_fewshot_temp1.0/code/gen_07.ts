const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineCount = 0;
let validLines = 0;

rl.on('line', (line) => {
  lineCount++;
  // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
  // 妥当である条件: 1個以上の数字列がカンマで区切られていること。末尾のカンマは許容。
  // 空行は妥当ではない。数字とカンマ以外を含む行は妥当ではない。

  let isValid = false;
  
  // 行から前後の空白を除去
  const trimmedLine = line.trim();

  if (trimmedLine.length === 0) {
    // 空行は妥当ではない
    isValid = false;
  } else {
    // 正規表現で「数字とカンマのみ」で構成されているかを確認し、かつそれが「1個以上の数字列」を含むことを確認する。
    // この課題の仕様を厳密に解釈すると、「1個以上の数字列がカンマで区切られて並んでいること」が重要。
    // 以下の正規表現は、数字、カンマ、空白（末尾のカンマを含む）のみで構成されている行を許容する。
    // ただし、行全体が「1個以上の数字列」で構成されていることを保証するには、より複雑なチェックが必要だが、
    // 例2の「カンマ区切りの語」の例に基づき、「数字とカンマ」のみを含む構造を妥当と見なすことに焦点を当てる。

    // 厳密なチェック: 行が数字とカンマのみで構成されており、かつ数字が含まれているか。
    // 許容されるパターン例: "1,2,3", "1,2," (末尾カンマ許容), "123"
    // 否定されるパターン例: "a,1", "1,a"

    // すべての文字が数字、カンマ、空白であるかを確認し、そしてカンマで区切られた数字列が1つ以上あるかを確認する。
    // ここでは、文字列を分割してチェックする方が、指定された「カンマ区切り」の性質に合致しやすい。

    const parts = line.split(',');
    
    // 1. 空行でないこと (すでにチェック済み)
    // 2. 少なくとも1つの要素が存在すること
    if (parts.length > 0) {
      let hasNumber = false;
      for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length > 0 && !isNaN(parseInt(trimmedPart, 10))) {
          hasNumber = true;
        } else if (trimmedPart.length > 0) {
          // 数字とカンマ以外を含む行は妥当ではない
          isValid = false;
          break;
        }
      }

      if (hasNumber) {
        // 少なくとも1つの有効な数字列が含まれていた
        isValid = true;
      } else if (parts.length === 1 && parts[0].trim() === "") {
        // 例: 空白で構成されたが、行全体が空でなかった場合（これは上記の行で除外されるべき）
        // ここでは、空行は既に除外されているため、この分岐は不要になるはず。
        isValid = false;
      } else if (parts.length > 0) {
          // 最後の要素がカンマのみの場合など、形式的なチェック
          // 末尾のカンマは許容されるが、それ以外は数字とカンマのみで構成されている必要がある。
          let allValidChars = true;
          for (const char of line) {
            if (!(char.match(/[0-9, ]/))) {
              allValidChars = false;
              break;
            }
          }
          if (allValidChars) {
              // 形式的に数字とカンマのみで構成されている場合
              // 少なくとも1つの有効な数字列が含まれているかチェック (hasNumberがTrueならOK)
              if (hasNumber) {
                  isValid = true;
              } else {
                  // 例: "," や ",," のような、数字を含まないがカンマのみの行
                  isValid = false;
              }
          } else {
              isValid = false;
          }
      }
    } else {
        // parts.length === 0 は発生しないが、念のため
        isValid = false;
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('close', () => {
  // 厳密に `valid=<妥当な行数>` の1行を出力する
  console.log(`valid=${validLines}`);
});
