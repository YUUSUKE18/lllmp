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
  // (?:[0-9]+,)*: 1つ以上の数字とカンマのペアが0回以上繰り返される (数字列の後にカンマが続く)
  // [0-9]+$: 最後の数字列が続く
  // または、単にカンマで区切られた数字列が続くことを確認する。

  // 妥当なパターン: 
  // 1. 数字とカンマのみで構成されている。
  // 2. 少なくとも1つの数字が含まれている。
  // 3. 末尾にカンマがあっても良い。

  // 処理を簡略化するため、カンマで分割し、各要素が整数であることを確認する。
  const parts = line.split(',');
  let isValid = true;

  if (parts.length === 0) {
    // これは空行で既に除外されているはずだが念のため
    isValid = false;
  } else {
    // 各部分が空でないか、かつ整数に変換可能かチェック
    let hasNumber = false;
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.length > 0) {
        const num = parseInt(trimmedPart, 10);
        if (!Number.isNaN(num)) {
          hasNumber = true;
        } else {
          // 数字とカンマ以外を含む場合
          isValid = false;
          break;
        }
      }
    }

    if (!isValid) {
      // 数字とカンマ以外を含む行は妥当ではない
      return;
    }

    // 1個以上の数字列がカンマで区切られているか (つまり、少なくとも1つの数字が含まれているか)
    if (!hasNumber) {
      // カンマのみ、または空の要素のみの場合 (例: "," や ",," など)
      isValid = false;
    }
  }

  if (isValid) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
