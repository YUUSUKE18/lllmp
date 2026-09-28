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
    // 末尾のカンマを許容しつつ、カンマ区切りの整数列が存在するかをチェックする
    // 正規表現で、カンマで区切られた数字の塊が存在するかをチェックする
    // 許容されるパターン: 0個以上の数字とカンマの組み合わせ。ただし、少なくとも1つの数字列が存在する必要がある。
    // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
    
    // 行をカンマで分割し、空でない要素が存在するか確認する
    const parts = line.split(',');
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        // 数字のみで構成されているかチェック（厳密には整数列である必要はないが、ここでは数字が含まれていることを確認する）
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
        // これは、カンマで区切られた要素の中に少なくとも1つの数字が含まれていれば良い、と解釈する。
        // ただし、「数字とカンマ以外を含む行は妥当ではない」という制約があるため、
        // 各要素が数字またはカンマのみで構成されているか、あるいは数字列が存在するかを厳しくチェックする。
        
        // ここでは、各要素が数字（または空文字列）で構成されていることを確認し、
        // 少なくとも1つの非空の数字列が存在すればOKとする。
        if (!isNaN(parseInt(trimmedPart, 10)) && trimmedPart.length > 0) {
          hasNumber = true;
        } else if (trimmedPart.length > 0 && !/^\d+$/.test(trimmedPart)) {
          // 数字とカンマ以外を含む行は妥当ではない
          hasNumber = false; // この行は不適格
          break;
        }
      }
    }

    // 妥当性の再評価：
    // 1. 空行は妥当ではない (空行はlines.push(line.trim())で格納されるが、ここでは空行をスキップする)
    // 2. 数字とカンマ以外を含む行は妥当ではない。
    // 3. 1個以上の数字列がカンマで区切られて並んでいること。
    
    // よりシンプルな解釈：行をカンマで分割した結果、少なくとも1つの非空の数字列が存在し、
    // その行が数字とカンマのみで構成されていること。
    
    let isValid = false;
    if (line.length > 0) {
        const parts = line.split(',');
        let hasValidNumber = false;
        let allValidChars = true;

        for (const part of parts) {
            const trimmedPart = part.trim();
            if (trimmedPart.length > 0) {
                // 数字のみで構成されているかチェック
                if (!/^\d+$/.test(trimmedPart)) {
                    allValidChars = false;
                    break;
                }
                hasValidNumber = true;
            }
        }

        if (allValidChars && hasValidNumber) {
            validCount++;
        }
    }
  }

  console.log(`valid=${validCount}`);
});
