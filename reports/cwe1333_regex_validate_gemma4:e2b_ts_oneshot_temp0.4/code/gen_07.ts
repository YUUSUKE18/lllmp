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

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマ以外を含まないか
  // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

  // 正規表現で検証:
  // ^: 行の先頭
  // (?:[0-9]+,?)+: 1つ以上の (数字 + オプションのカンマ) の繰り返し
  // $: 行の末尾
  // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認するのに役立ちます。
  // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」ことを求めているため、
  // 厳密には「数字が少なくとも1つ含まれていること」と「カンマで区切られていること」が必要です。

  // より直接的なチェック:
  // 行をカンマで分割し、各要素が数字のみで構成されているかを確認する。
  const parts = trimmedLine.split(',');

  if (parts.length === 0) {
    // これは空行で既に除外されているはずだが念のため
    return;
  }

  let isValid = true;
  let hasNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") {
      // カンマが連続している場合や、末尾のカンマが残った場合に対応
      continue;
    }

    // 数字のみで構成されているかチェック
    if (!/^\d+$/.test(trimmedPart)) {
      isValid = false;
      break;
    }
    hasNumber = true;
  }

  // 1個以上の数字列がカンマで区切られていること (つまり、数字が少なくとも1つ含まれていること)
  if (hasNumber) {
    validLines++;
  }
});

rl.on('end', () => {
  console.log(`valid=${validLines}`);
});
