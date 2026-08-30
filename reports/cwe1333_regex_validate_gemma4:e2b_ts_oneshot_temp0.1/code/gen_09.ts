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
  // 2. 1個以上の数字列がカンマで区切られているか（末尾のカンマは許容）

  // 正規表現で検証:
  // ^: 行の開始
  // (?:[0-9]+,?)+: 1つ以上の (数字 + オプションのカンマ) の繰り返し
  // $: 行の終了
  // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認するのに役立ちます。
  // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」ことを求めているため、
  // 厳密には、カンマで区切られた各要素が整数であることを確認する必要があります。

  // より厳密なチェック:
  // 1. 行が空でないこと (既にチェック済み)
  // 2. 行に含まれる文字が数字とカンマのみであること
  // 3. 少なくとも1つの数字が含まれていること

  let isValid = true;
  let hasNumber = false;

  for (let i = 0; i < trimmedLine.length; i++) {
    const char = trimmedLine[i];
    if (!/[0-9, ]/.test(char)) {
      isValid = false;
      break;
    }
    if (/[0-9]/.test(char)) {
      hasNumber = true;
    }
  }

  if (!isValid || !hasNumber) {
    // 数字とカンマ以外が含まれている、または数字が一つもない場合
    // ただし、末尾のカンマは許容されるため、末尾のカンマのみの行は除外されるべき。
    // 「1個以上の数字列がカンマで区切られて並んでいる」
    // 例: "1,2," は妥当。 "1," は妥当。
    // "abc" は不妥当。
    // "1,a" は不妥当。

    // 妥当な形式の定義を再解釈:
    // 1. カンマで区切られた要素がすべて整数であること。
    // 2. 少なくとも1つの整数が含まれていること。

    // カンマで分割し、各要素が整数であるかチェックする
    const parts = trimmedLine.split(',');
    let allAreIntegers = true;
    let hasAtLeastOneNumber = false;

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart === "") {
        // 空の要素は許容される（例: "1,,2" の中間）
        continue;
      }
      if (!/^\d+$/.test(trimmedPart)) {
        // 数字以外の文字が含まれている場合
        allAreIntegers = false;
        break;
      }
      hasAtLeastOneNumber = true;
    }

    if (allAreIntegers && hasAtLeastOneNumber) {
      validLines++;
    }
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
