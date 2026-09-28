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
    // 妥当性の判定ロジック
    // 1. 空行でないこと
    if (line === "") {
      continue;
    }

    // 2. 数字とカンマのみで構成されていること
    // 正規表現で、数字とカンマのみで構成されているかチェックする
    // 許容されるパターン: 数字, カンマ, 空白 (ただし、行全体がこれらで構成されている必要がある)
    // 仕様に基づくと、「1 個以上の数字列がカンマで区切られて並んでいる」ことが重要。
    
    // 行全体をカンマで分割し、空でない要素が存在するかをチェックする
    const parts = line.split(',');
    
    // 末尾のカンマは許容されるため、末尾の要素が空であっても問題ない。
    // 妥当であるためには、少なくとも1つの数字列が存在する必要がある。
    let hasNumber = false;
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length > 0) {
            // その部分が整数であるかチェック
            if (/^\d+$/.test(trimmedPart)) {
                hasNumber = true;
            } else {
                // 数字とカンマ以外を含む場合、妥当ではない
                console.error(`Invalid content found in line: ${line}`);
                // この行全体を妥当ではないと見なす
                break;
            }
        }
    }

    if (hasNumber) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
