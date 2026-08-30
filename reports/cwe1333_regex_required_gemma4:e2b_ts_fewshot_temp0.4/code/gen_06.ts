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
  lineNumber++;
});

rl.on('close', () => {
  let validLines = 0;
  // 各行を正規表現で判定する
  // 正規表現の解説:
  // ^\s*       : 行の先頭の任意の空白文字
  // (?:       : 非キャプチャグループの開始
  //   \d+     : 1つ以上の数字
  //   ,?      : 0個または1個のカンマ
  // )+        : 上記グループが1回以上繰り返される
  // \s*$       : 行末の任意の空白文字
  // このパターンは、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認します。
  const validRegex = /^\s*(?:\d+(?:,\d+)*)\s*$/;

  for (const line of lines) {
    // 行が完全に空でないことを確認する（空行は妥当ではない）
    if (line.trim() === "") {
      continue;
    }

    // 正規表現で妥当性を判定
    if (validRegex.test(line)) {
      validLines++;
    }
  }

  // 厳密に 1 行だけ出力
  console.log(`valid=${validLines}`);
});
