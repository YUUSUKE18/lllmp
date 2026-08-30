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

    // 2. 数字とカンマ以外を含まないこと
    // 正規表現で数字とカンマのみで構成されているかチェック
    const validPattern = /^[0-9,]*$/;

    // 3. 1個以上の数字列がカンマで区切られていること (末尾のカンマは許容)
    // カンマで分割し、空でない要素が1つ以上あるかを確認する
    const parts = line.split(',');
    let hasNumbers = false;
    for (const part of parts) {
      if (part.trim() !== "") {
        // その部分が整数のみで構成されているか確認
        if (/^\d+$/.test(part.trim())) {
          hasNumbers = true;
        } else {
          // 数字以外の文字が含まれている場合、妥当ではない
          hasNumbers = false;
          break;
        }
      }
    }

    // 妥当な行の条件: 空行でなく、かつ、カンマで区切られた要素の中に少なくとも1つの数字が含まれていること。
    // 仕様の解釈: 「1 個以上の数字列がカンマで区切られて並んでいること」
    // 例: "1,2,3" -> 3つの数字列
    // 例: "1," -> 1つの数字列
    // 例: "," -> 0個の数字列 (空行とみなされるべきか？)
    // 例: "" -> 空行 (除外)

    // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」をチェックする。
    // これは、カンマで分割した結果、数字のみの要素が1つ以上存在すれば良い、と解釈する。
    
    let actualNumberCount = 0;
    for (const part of parts) {
        if (part.trim() !== "") {
            // 数字のみの要素としてカウント
            if (/^\d+$/.test(part)) {
                actualNumberCount++;
            }
        }
    }

    if (actualNumberCount >= 1) {
        validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
