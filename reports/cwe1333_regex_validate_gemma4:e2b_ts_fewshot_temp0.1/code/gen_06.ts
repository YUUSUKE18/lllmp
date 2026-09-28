const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let validCount = 0;
  for (const line of lines) {
    // 末尾のカンマを許容しつつ、カンマ区切りの整数列が存在するかを判定する
    // 正規表現で、カンマで区切られた数字の並びが存在するかをチェックする
    // 許容されるパターン: 0個以上のカンマ、数字、0個以上のカンマ
    // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要がある。
    
    // 1. 行が空でないことを確認
    if (line === "") {
      continue;
    }

    // 2. 行が数字とカンマのみで構成されているか、またはその一部であるかを確認する
    // 妥当性の定義: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
    // 例: "1,2,3" -> 妥当
    // 例: "1,2," -> 妥当
    // 例: "1" -> 妥当 (カンマなしも1個の数字列と見なせるか？仕様は「カンマで区切られて並んでいる」)
    // 仕様を厳密に解釈すると、「カンマで区切られた複数の数字」が求められている。
    // 「1 個以上の数字列がカンマで区切られて並んでいる」
    
    // カンマで区切られた要素を分割し、その要素がすべて整数であるかを確認する。
    const parts = line.split(',');
    
    // 妥当性の判定ロジックを再検討:
    // 「1 個以上の数字列がカンマで区切られて並んでいる」
    // これは、カンマで区切られた要素の中に、整数のみが含まれている必要がある。
    
    let hasInteger = false;
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length > 0 && /^-?\d+$/.test(trimmedPart)) {
            hasInteger = true;
        }
    }
    
    // 末尾のカンマは許容される。
    // 空行は妥当ではない。
    // 数字とカンマ以外を含む行は妥当ではない。
    
    // 妥当な行の条件:
    // 1. 空行ではない。
    // 2. 行に含まれるすべての非空白文字が数字またはカンマである。
    // 3. 少なくとも1つの数字列が含まれている。
    
    let isStrictlyValid = true;
    let foundNumber = false;
    
    for (const char of line) {
        if (!(char === ',' || /^\d$/.test(char) || /^\s$/.test(char))) {
            isStrictlyValid = false;
            break;
        }
        if (/\d/.test(char)) {
            foundNumber = true;
        }
    }

    if (isStrictlyValid && foundNumber) {
        validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
