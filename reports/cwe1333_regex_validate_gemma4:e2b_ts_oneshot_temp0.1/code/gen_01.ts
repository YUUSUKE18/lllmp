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

  // 正規表現で検証:
  // ^: 行の開始
  // (?:[0-9]+,)*: 1つ以上の数字とカンマのペアが0回以上繰り返される (数字列の後にカンマが続く)
  // [0-9]+$: 最後の数字列
  // |: または
  // ^[0-9]+(?:,.*)?$: 最初の数字列のみ (末尾のカンマは許容)

  // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」をチェックする
  // 許容されるパターン: 数字列, 数字列, ... (末尾にカンマがあっても良い)
  // 例: 1,2,3, または 1,2,3,
  // 例: 123,456
  // 例: 123,
  // 例: 123,456,

  // 1. カンマで区切られた数字列のみで構成されているかを確認
  // 許容されるのは、数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれている場合。
  const isValidFormat = /^[0-9,]*$/.test(trimmedLine);

  if (!isValidFormat) {
    // 数字とカンマ以外を含む行は妥当ではない
    return;
  }

  // 2. 1個以上の数字列がカンマで区切られているかを確認
  // 末尾のカンマは許容される。
  // 許容されるパターン: (数字, の繰り返し) または (数字, の繰り返し, 末尾カンマ)
  // 少なくとも1つの数字が含まれている必要がある。

  // 最後の文字がカンマで終わるか、数字で終わるかをチェック
  const endsWithComma = trimmedLine.endsWith(',');
  const contentWithoutTrailingComma = trimmedLine.slice(0, -1);

  if (endsWithComma) {
    // 末尾がカンマの場合、カンマを除いた部分に数字が含まれているかチェック
    if (contentWithoutTrailingComma.length > 0 && /^[0-9]+$/.test(contentWithoutTrailingComma)) {
      // 例: "1,2," -> "1,2" は数字のみ
      // 例: "1," -> "1" は数字のみ
      // このケースは、数字列が1つ以上存在する場合に成立する。
      // ただし、" ," や ",," のようなケースは除外されるべき。
      // 少なくとも1つの数字が含まれていることを確認する。
      if (contentWithoutTrailingComma.includes('0') || contentWithoutTrailingComma.includes('1') || contentWithoutTrailingComma.includes('2') || contentWithoutTrailingComma.includes('3') || contentWithoutTrailingComma.includes('4') || contentWithoutTrailingComma.includes('5') || contentWithoutTrailingComma.includes('6') || contentWithoutTrailingComma.includes('7') || contentWithoutTrailingComma.includes('8') || contentWithoutTrailingComma.includes('9')) {
        validLines++;
      }
    }
  } else {
    // 末尾がカンマでない場合、カンマで区切られていることを確認する
    // カンマが1つ以上存在し、かつ数字が含まれている必要がある。
    if (trimmedLine.includes(',') && /^[0-9]+(?:,[0-9]+)*$/.test(trimmedLine)) {
      // この正規表現は、数字がカンマで区切られていることを保証する。
      // 例: "1,2,3" は OK
      // 例: "1" は OK (カンマなしも許容されるべきか？仕様は「カンマで区切られて並んでいる」)
      // 「1個以上の数字列がカンマで区切られて並んでいる」
      // 1個の数字列のみ (例: "1") は、区切りがないため、厳密には「区切られている」とは言えない。
      // しかし、例1の処理から、単一の数字列も許容されると解釈する。
      // 1個の数字列のみ (例: "1") は、区切りがないため、ここでは妥当としない（カンマ区切りが必須）。
      // したがって、カンマが1つ以上存在することを要求する。
      validLines++;
    }
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
