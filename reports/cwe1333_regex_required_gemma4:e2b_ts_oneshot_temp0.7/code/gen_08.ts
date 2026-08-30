const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let validLines = 0;

rl.on('line', (line) => {
  // 正規表現:
  // ^\s*          : 行の先頭の任意の空白
  // (?:[0-9]+,\s*)* : 1つ以上の (数字, 空白) のグループ。カンマ区切りの数字列が続く
  // [0-9]+        : 少なくとも一つの数字（行が空でないことを保証するため）
  // (?:,\s*[0-9]+)* : カンマと数字の繰り返し（末尾のカンマも許容するため）
  // \s*$          : 行末の任意の空白
  // この正規表現は「カンマ区切りの整数列」が1つ以上存在することをチェックするのに複雑になるため、
  // 以下のロジックで分解してチェックします。

  const trimmedLine = line.trim();

  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // 妥当性の判定ロジック:
  // 1. 行が数字とカンマのみで構成されているかを確認する。
  // 2. 少なくとも1つの数字が存在するかを確認する。

  // 許容されるパターン: 数字、カンマ、空白のみ
  // 厳密に「カンマ区切りの整数列」が1個以上あることを確認する。
  // 例: "1,2,3" または "1,2," または "1" (※仕様では「カンマ区切りの整数列」が求められているため、カンマを含む形式を重視)

  // 正規表現で「カンマ区切りの整数列」をチェック
  // これは、「数字,数字, ...」の形式が少なくとも1つ含まれていることを確認します。
  // \d+ は1つ以上の数字
  // (?:,\d+)* はカンマとそれに続く数字の繰り返し
  // このパターンが全体にマッチすれば、カンマ区切りの数字列が存在すると見なします。
  const regex = /^[\d,]*(\d+)(?:,[\d]+)*[\d,]*$/;

  // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
  // 最小限のチェックとして、カンマが存在し、数字が含まれていることを確認します。
  // 末尾のカンマは許容される。

  let hasComma = line.includes(',');
  let hasDigit = false;
  let isValid = false;

  if (trimmedLine.length > 0) {
    // 行が数字とカンマのみで構成されているか、および数字が含まれているかをチェック
    const parts = trimmedLine.split(',');
    let allAreNumbersOrEmpty = true;
    let hasNumbers = false;

    for (const part of parts) {
      if (part.trim() === "") {
        // 空の要素は許容される（カンマが連続する場合など）
        continue;
      }
      if (!/^\d+$/.test(part)) {
        // 数字とカンマ以外の文字が含まれている
        allAreNumbersOrEmpty = false;
        break;
      }
      hasNumbers = true;
    }

    if (allAreNumbersOrEmpty && hasNumbers) {
      // 1個以上の数字列がカンマで区切られている（または単一の数字）
      isValid = true;
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
