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
  // 1. 数字とカンマ以外を含まないか
  // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

  // 正規表現で検証:
  // ^: 行の開始
  // (?:[0-9]+(?:,|$))+: 1つ以上の数字列とカンマの組み合わせ。
  //   [0-9]+: 1つ以上の数字
  //   (?:,|$) : カンマまたは行末
  // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字列が存在することを保証します。
  // 末尾のカンマも許容するため、行末にカンマが続くパターンも考慮する必要があります。

  // より厳密なチェック:
  // 1. 行が数字とカンマのみで構成されているか
  // 2. 少なくとも1つの数字が含まれているか

  let isValid = true;
  let hasNumber = false;
  let lastCharWasComma = false;

  for (let i = 0; i < trimmedLine.length; i++) {
    const char = trimmedLine[i];

    if (char >= '0' && char <= '9') {
      hasNumber = true;
      lastCharWasComma = false;
    } else if (char === ',') {
      lastCharWasComma = true;
    } else {
      // 数字とカンマ以外が含まれている
      isValid = false;
      break;
    }
  }

  if (!isValid || !hasNumber) {
    // 数字が一つも含まれていない、または不正な文字が含まれている場合
    // ただし、末尾のカンマのみの行は「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たさないため、
    // 厳密には数字が含まれている必要がある。
    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。」
    // 数字列が0個の場合、これは満たされない。
    // 数字列が1個以上あることを確認する。
    
    // 最後の文字がカンマで終わる場合、それは許容されるが、数字が0個ならNG。
    // 例: "," -> hasNumber=false -> 不正
    // 例: "1," -> hasNumber=true -> 妥当
    // 例: ",," -> hasNumber=false -> 不正
    
    // 妥当な行の判定を再評価:
    // 1. 数字とカンマ以外を含まない。
    // 2. 少なくとも1つの数字列が存在する。
    
    // 上記ループでisValidがfalseになった場合、それは不正。
    // hasNumberがfalseの場合、それは不正。
    
    if (!isValid) {
        // 不正な文字が含まれていた場合
        continue;
    }
    
    if (!hasNumber) {
        // 数字が一つも含まれていない場合 (例: "," または ",," など)
        continue;
    }
  }

  // 妥当な行としてカウント
  validLines++;
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
