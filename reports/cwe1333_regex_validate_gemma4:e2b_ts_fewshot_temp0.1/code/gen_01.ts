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
    // 正規表現で、カンマで区切られた数字の列が存在するかをチェックする
    // 許容されるパターン: 0個以上の数字とカンマの組み合わせ。ただし、少なくとも1つの数字列が存在する必要がある。
    // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
    
    // 行をカンマで分割し、空でない要素が存在するかを確認する
    const parts = line.split(',');
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        // 数字のみで構成されているかチェック（厳密には整数列である必要はないが、ここでは数字が含まれていることを確認する）
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
        // これは、カンマで区切られた要素の中に少なくとも1つの数字が含まれていれば良い、と解釈する。
        // ただし、空行や数字とカンマ以外を含む行は妥当ではない、という制約がある。
        
        // 空行、および数字とカンマ以外を含む行は妥当ではない。
        // これは、行全体が「カンマ区切りの整数列」の形式に従っていることを意味する。
        
        // 形式チェック: 行がカンマで区切られた文字列の集合であること。
        // 空行は妥当ではない。
        if (trimmedPart.length > 0) {
          // 数字とカンマ以外を含む行は妥当ではない。
          // ここでは、行全体が数字とカンマのみで構成されているか、または空行でないことを確認する。
          // 厳密に「カンマ区切りの整数列」として妥当であるためには、
          // 1. 空行でないこと。
          // 2. 全ての要素が数字またはカンマのみで構成されていること。
          // 3. 少なくとも1つの数字列が存在すること。
          
          // 簡略化して、行が空でなく、かつ、その行が数字とカンマのみで構成されているかを確認する。
          // 課題の意図を「カンマで区切られた要素の中に、少なくとも1つの有効な整数が含まれているか」と解釈する。
          
          // 妥当性の判定を再定義:
          // 1. 空行は妥当ではない。
          // 2. 数字とカンマ以外を含む行は妥当ではない。
          // 3. 1個以上の数字列がカンマで区切られて並んでいること。
          
          // 1. 空行チェック
          if (line.length > 0) {
            // 2. 数字とカンマ以外を含む行のチェック
            let isValidFormat = true;
            for (const char of line) {
              if (!/[0-9, ]/.test(char)) {
                isValidFormat = false;
                break;
              }
            }
            if (!isValidFormat) {
              continue; // 妥当ではない
            }

            // 3. 少なくとも1つの数字列が存在するかチェック
            let foundNumber = false;
            for (const part of parts) {
              if (part.trim().length > 0 && /^\d+$/.test(part.trim())) {
                foundNumber = true;
                break;
              }
            }
            
            if (foundNumber) {
              validCount++;
            }
          }
        }
      }
    }
  }
  console.log(`valid=${validCount}`);
});
