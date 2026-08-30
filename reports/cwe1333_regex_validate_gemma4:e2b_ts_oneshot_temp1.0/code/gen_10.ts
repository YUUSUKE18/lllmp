const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineNumber = 0;
let validLines = 0;

rl.on('line', (line) => {
  lineNumber++;
  const trimmedLine = line.trim();
  let isValid = false;

  if (trimmedLine.length > 0) {
    // カンマ区切りの整数列として妥当か判定
    // 正規表現: 数字とカンマのみを含む（末尾のカンマも許容）
    // 1個以上の数字がカンマで区切られているかを確認
    
    // 正規表現の解説:
    // ^: 行の開始
    // (?:[0-9]+(?:,.*)*): 1つ以上の数字（数字の塊）と、それらに続くカンマと任意の文字の繰り返し。
    // (?:\s*,\s*)*: ゼロ個以上の空白とカンマの繰り返し（末尾のカンマを許容するため）
    // $ : 行の終わり
    // このロジックは少し複雑になるため、より直接的に「カンマで区切られた数字列」として評価します。

    // 妥当なケースの定義:
    // 1. 空行ではない。
    // 2. 数字とカンマのみで構成されている。
    // 3. 少なくとも1つの数字が含まれている。

    // 数字とカンマのみで構成されているかをチェック
    const regex = /^[\d,]*$/;
    if (regex.test(trimmedLine)) {
      // 少なくとも1つの数字が含まれているかチェック (カンマのみの行を除く)
      const containsDigit = /\d/.test(trimmedLine);
      
      if (containsDigit) {
        // カンマ区切りの整数列が1個以上存在する場合
        // 末尾のカンマは許容されるが、数字が含まれていればOKとする。
        // 例: "1,2,3" -> OK
        // 例: "1," -> OK
        // 例: "," -> NG (containsDigitがfalseになるため)
        
        isValid = true;
      }
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
