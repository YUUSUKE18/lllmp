const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 末尾のカンマは許容する
  if (trimmedLine.endsWith(',')) {
    // カンマで終わる行は、カンマで区切られた整数列として妥当と見なす
    // 内部が全て数字とカンマのみであればOK
    const contentWithoutTrailingComma = trimmedLine.slice(0, -1);
    if (/^\d+(,\d+)*$/.test(contentWithoutTrailingComma) || /^\d+$/.test(contentWithoutTrailingComma)) {
        validLines++;
    }
    return;
  }

  // 末尾のカンマがない場合、カンマ区切りで数字のみが含まれているかチェック
  // 正規表現: 1つ以上の数字とカンマの組み合わせ
  // 例: "1,2,3" または "123"
  const pattern = /^(\d+(,\d+)*)$/;
  if (pattern.test(trimmedLine)) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
