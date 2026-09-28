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
  // 2. 1個以上の数字列がカンマで区切られているか
  
  // 正規表現で、数字とカンマのみで構成されているかを確認
  // ^[0-9,]*$ は、行の先頭から末尾までが数字とカンマのみで構成されていることを意味する
  // ただし、仕様では「数字列がカンマで区切られて並んでいる」ことを求めているため、
  // 厳密には、カンマで区切られた後に数字が続くことを確認する必要がある。
  // ここでは、行がカンマと数字のみで構成されていることを確認し、
  // 少なくとも1つの数字が含まれていることを確認する。
  
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
      // カンマの連続や前後の空白による空の要素は許容される（末尾のカンマは許容）
      continue;
    }
    
    // 数字のみが含まれているかチェック
    if (!/^\d+$/.test(trimmedPart)) {
      // 数字とカンマ以外を含む場合、妥当ではない
      isValid = false;
      break;
    }
    
    // 数字列が存在する場合
    hasNumber = true;
  }

  // 妥当であるためには、少なくとも1個の数字列が存在する必要がある
  if (isValid && hasNumber) {
    validLines++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
