const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  // 正規表現パターン:
  // ^\s*             -> 行の先頭の空白を無視
  // (?:             -> 非キャプチャグループ開始
  //   \d+,\s*       -> 1つ以上の数字、カンマ、任意の空白
  // )+              -> 上記パターンが1回以上繰り返される
  // \d+             -> 最後の数字（末尾のカンマがあっても、数字列が続くことを確認するため）
  // (?:,\s*$)       -> 末尾のカンマと空白（オプション）
  // $               -> 行の終わり
  // この正規表現は「1個以上の数字列がカンマで区切られて並んでいる」ことを確認します。
  // 末尾のカンマは許容されますが、行全体が数字とカンマのみで構成されている必要があります。

  // 妥当性の判定ロジックをより厳密にするため、以下のステップを踏みます。

  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 1. 数字とカンマのみで構成されているかを確認する
  // 正規表現: 任意の文字（数字、カンマ、空白）が0回以上続く
  const pattern = /^[\d,]*$/;
  if (!pattern.test(line)) {
    // 数字とカンマ以外の文字が含まれている場合は妥当ではない
    return;
  }

  // 2. カンマ区切りとして意味のある数字列が存在するかを確認する
  // 末尾のカンマは許容されるが、少なくとも1つの数字列が存在する必要がある。
  // 以下のパターンは、少なくとも1つの数字列（カンマで区切られたもの）が存在することを要求します。
  // 例: "1,2,3" や "100,"
  const validPattern = /^[\d,]+(?:,\s*[\d,]+)*[,\d]*$/;

  if (validPattern.test(line)) {
    validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
