const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let validLines = 0;

rl.on('line', (line) => {
  // 正規表現: 
  // ^\s*          -> 行頭の空白を無視
  // (?:          -> 非キャプチャグループ開始
  //   \d+,\s*    -> 1つ以上の数字とカンマ、それに続く空白（1個以上の要素）
  //   |          -> または
  //   \d+       -> 1つ以上の数字（最後の要素）
  // )+           -> 上記のパターンが1回以上繰り返される
  // (?:,\s*$)    -> 末尾のカンマと空白（オプション）
  // $            -> 行末
  // この正規表現は、カンマ区切りの整数列が1つ以上存在し、数字とカンマ以外を含まないことを確認するのに複雑になるため、
  // よりシンプルに「カンマで区切られた数字の列」の構造をチェックします。

  // 妥当性の判定ロジック:
  // 1. 行が空でないこと。
  // 2. 行が数字とカンマのみで構成されていること。
  // 3. カンマで区切られた1つ以上の数字列が存在すること。

  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 正規表現で「数字とカンマのみ」の構造をチェック
  // 許容されるパターン: 数字とカンマのみで構成され、カンマで区切られている。
  // 例: "1,2,3" または "1,2,"
  // 数字とカンマ以外の文字が含まれていないことを確認する。
  const validPattern = /^[0-9,]*(\d+)(?:,\s*\d+)*[0-9,]*$|^[0-9,]+(?:,\s*[0-9,]+)*$/;

  // より厳密に、カンマで区切られた整数列が1つ以上存在し、数字とカンマ以外を含まないことを確認する。
  // 1. 数字とカンマ以外を含まないこと
  if (!/^[0-9,]*$/.test(line)) {
    return; // 数字とカンマ以外を含む行は妥当ではない
  }

  // 2. 1個以上の数字列がカンマで区切られていること
  // カンマで区切られた要素を分割し、空でない要素が1つ以上あるか確認する。
  const parts = line.split(',');
  let hasNumbers = false;
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.length > 0 && /^\d+$/.test(trimmedPart)) {
      hasNumbers = true;
    }
  }

  if (hasNumbers) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
