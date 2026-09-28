const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  // 行の前後の空白を無視
  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 正規表現による判定:
  // ^\s*          : 行の先頭の空白（無視される）
  // (?:[0-9]+,\s*)* : 1つ以上の数字とカンマのペア（数字列とカンマ）が0回以上繰り返される
  // [0-9]+       : 少なくとも1つの数字列が存在する
  // (?:,\s*[0-9]+)* : 任意の数のカンマと数字列が続く
  // $            : 行の終わり
  //
  // よりシンプルに、カンマ区切りの整数列が1つ以上存在し、数字とカンマ以外を含まないことを確認する。
  // 妥当なパターン: 数字とカンマのみで構成され、少なくとも1つの数字が含まれる。
  // 末尾のカンマは許容される。
  // 例: "1,2,3" または "1,2,"
  // 否定的な条件: 数字とカンマ以外の文字が含まれていないこと。
  // 妥当な行のパターン: 1つ以上の数字とカンマのみで構成される。
  // 正規表現の解説:
  // ^\s*             : 行の先頭の空白
  // (?:[0-9]+,\s*)*  : 0回以上の (数字 + カンマ + 空白) の繰り返し
  // [0-9]+           : 少なくとも1つの数字列が存在する
  // (?:,\s*[0-9]+)*  : 任意の数のカンマと数字列が続く
  // \s*$             : 行末の空白
  //
  // 簡略化された判定ロジック:
  // 1. 数字とカンマ以外の文字が含まれていないか？
  // 2. 少なくとも1つの数字が含まれているか？
  // 3. 末尾のカンマは許容される。

  // 1. 数字とカンマ以外の文字が含まれていないかチェック
  const containsOnlyDigitsAndCommas = /^[0-9,]*$/.test(line);

  if (!containsOnlyDigitsAndCommas) {
    return; // 数字とカンマ以外を含む行は妥当ではない
  }

  // 2. 少なくとも1つの数字が含まれているかチェック
  // 末尾のカンマのみの行 ("," や ",," など) は妥当ではない。
  const containsAtLeastOneDigit = /\d/.test(line);

  if (containsAtLeastOneDigit) {
    // 3. 妥当な行としてカウント
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
