const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  let validCount = 0;
  for (const line of lines) {
    // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
    // 妥当な行は、「1個以上の数字列がカンマで区切られて並んでいる」こと。
    // 末尾のカンマは許容される。
    
    // 行全体をトリムして、カンマで分割する
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) {
      // 空行は妥当ではない
      continue;
    }

    // 末尾のカンマを許容するため、行をそのまま処理する
    const parts = line.split(',');
    
    // 妥当であるための条件: 1個以上の数字列がカンマで区切られている。
    // partsの長さが1以上であり、かつ、分割された要素の中に少なくとも1つの数字列が含まれている必要がある。
    
    let hasNumber = false;
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length > 0 && !isNaN(parseInt(trimmedPart, 10))) {
            hasNumber = true;
        }
    }

    // 妥当な行の判定ロジックの再検討:
    // 「1 個以上の数字列がカンマで区切られて並んでいること」
    // 例: "1,2,3" -> parts=["1", "2", "3"]. hasNumber=true. OK.
    // 例: "1," -> parts=["1", ""]. hasNumber=true. OK. (末尾のカンマは許容)
    // 例: "," -> parts=["", ""]. hasNumber=false. NG.
    // 例: "abc" -> parts=["abc"]. hasNumber=false. NG.

    // 厳密に「数字列」のみを考慮する
    let actualNumberCount = 0;
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
            actualNumberCount++;
        }
    }

    // 1個以上の数字列がカンマで区切られて並んでいること
    if (actualNumberCount >= 1) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
