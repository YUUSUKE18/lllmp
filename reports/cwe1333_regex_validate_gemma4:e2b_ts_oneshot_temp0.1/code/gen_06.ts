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

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマのみで構成されているか
  // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

  // 正規表現でチェック: 
  // ^: 行の開始
  // (?:[0-9]+(?:,|$))+: 1つ以上の数字列とカンマの組み合わせ。末尾のカンマも許容する。
  // $ : 行の終了
  // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字列が含まれていることを確認する。
  const regex = /^(?:[0-9]+,?)+$/;

  if (regex.test(trimmedLine)) {
    // 妥当な行としてカウント
    validLines++;
  }
});

rl.on('close', () => {
  // 最終結果を出力
  console.log(`valid=${validLines}`);
});
