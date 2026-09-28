const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validCount = 0;
  const regex = /^[\d,]+(?:,[\d,]+)*$|^[,]*$/;

  for (const line of lines) {
    // 行の前後の空白を無視する（ただし、readlineは改行で区切るため、line自体は読み取った内容）
    const trimmedLine = line.trim();

    // 1. 空行の判定（空行は妥当ではない）
    if (trimmedLine === "") {
      continue;
    }

    // 2. 数字とカンマのみで構成されているか、またはカンマのみで構成されているかを確認
    // 正規表現の解釈:
    // ^[\d,]+(?:,[\d,]+)*$ : 数字とカンマが交互に続く、または数字とカンマの組み合わせで構成されているパターン
    // | : または
    // [,]*$ : カンマのみ（末尾のカンマも含む）
    // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいること」なので、カンマ区切りの数字列が主。
    
    // 妥当な行の判定基準を再検討します:
    // 「1 個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容します。」
    // これは、数字とカンマのみで構成され、かつ数字列が存在することを意味します。

    // より厳密な正規表現の試み:
    // 1. 少なくとも一つの数字が含まれていること。
    // 2. 数字とカンマ以外の文字が含まれていないこと。

    // 候補1: 数字とカンマのみで構成されているか、またはカンマのみで構成されている
    // 例: "1,2,3", "1,2,", ",,"
    const isPotentiallyValid = /^[0-9,]+(?:,[0-9,]+)*$|^[,]*$/.test(line);

    if (isPotentiallyValid) {
      // さらに「1個以上の数字列」があるかを確認する
      // 数字列が一つ以上存在するかどうか
      const containsNumber = /[0-9]/.test(line);
      
      // カンマのみの行 (例: "," や ",," ) は「1個以上の数字列」ではないため除外
      if (containsNumber) {
        validCount++;
      }
    }
  }

  console.log(`valid=${validCount}`);
});
