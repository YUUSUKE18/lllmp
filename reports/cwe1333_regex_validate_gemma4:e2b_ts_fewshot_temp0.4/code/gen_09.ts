const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line.trim());
  lineNumber++;
});

rl.on('close', () => {
  let validCount = 0;
  for (const line of lines) {
    // 1. 空行のチェック
    if (line === "") {
      continue;
    }

    // 2. 数字とカンマ以外の文字が含まれていないかチェック
    // 正規表現で数字とカンマのみが続くかを確認する
    const validPattern = /^[0-9,]*$/;

    // 3. 妥当性の判定
    // 1個以上の数字列がカンマで区切られているか、または末尾のカンマのみか
    // 妥当な行は、数字とカンマのみで構成されている行である。
    // 「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすためには、
    // 少なくとも1つの数字が含まれている必要がある。
    
    // 処理を簡略化し、仕様を再解釈する:
    // 「1 個以上の数字列がカンマで区切られて並んでいる」
    // 「空行、および数字とカンマ以外を含む行は妥当ではありません。」
    // 「末尾のカンマは許容します。」
    
    // 妥当な行とは、数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれている行と解釈する。
    
    let containsNumber = false;
    let hasContent = false;
    
    // 行をカンマで分割して、数字列が存在するか確認する
    const parts = line.split(',');
    
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length > 0) {
            // 数字のみで構成されているか確認
            if (/^\d+$/.test(trimmedPart)) {
                containsNumber = true;
            } else {
                // 数字以外の文字が含まれている場合、その行は妥当ではない
                containsNumber = false; // 既に数字が見つかっていればリセットする
                break;
            }
        }
    }

    // 妥当な行の判定ロジックを再検討:
    // 「1 個以上の数字列がカンマで区切られて並んでいる」
    // これは、カンマで区切られた要素の中に、少なくとも1つの有効な整数が含まれていることを意味する。
    
    // よりシンプルな解釈: 行が数字とカンマのみで構成されており、かつ少なくとも1つの数字が含まれていること。
    
    let isRowValid = true;
    let foundDigit = false;
    
    for (const char of line) {
        if (!/^[0-9, ]$/.test(char)) {
            isRowValid = false;
            break;
        }
        if (/\d/.test(char)) {
            foundDigit = true;
        }
    }
    
    // 妥当な行の条件:
    // 1. 数字とカンマ以外の文字を含まない (上記でチェック済み)
    // 2. 少なくとも1つの数字が含まれている (1個以上の数字列が並んでいる)
    
    if (isRowValid && foundDigit) {
        validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
