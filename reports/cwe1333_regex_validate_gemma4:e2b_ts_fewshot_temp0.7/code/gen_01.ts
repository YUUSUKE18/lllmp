const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let linesRead = 0;
let validLines = 0;

rl.on('line', (line) => {
  linesRead++;
  // 行の前後の空白を無視して処理
  const trimmedLine = line.trim();
  
  if (trimmedLine === "") {
    // 空行は妥当ではない
    return;
  }

  // カンマ区切りの整数列として妥当か判定
  // 1. 数字とカンマ以外を含まないか
  // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)
  
  // 正規表現で検証: 
  // ^[0-9,]*$ : 0個以上の数字とカンマのみ
  // カンマで区切られた整数列のパターンをチェックする。
  
  // 妥当なパターン: 
  // 少なくとも1つの数字が含まれており、カンマで区切られている、またはカンマのみである。
  
  // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」をチェックする。
  // これは、文字列がカンマで区切られた整数（空でないもの）のみで構成されている必要がある。
  
  let isValid = false;
  
  // 末尾のカンマを許容しつつ、数字とカンマのみで構成されているか確認する
  // 例: "1,2,3", "1,2,", ",," (これはNG)
  
  // 1. 数字とカンマのみで構成されているか確認
  const matchesPattern = /^[0-9,]*$/;
  if (!matchesPattern.test(trimmedLine)) {
    // 数字とカンマ以外を含む行は妥当ではない
    return;
  }

  // 2. 1個以上の数字列がカンマで区切られているか確認
  // 複数の数字が含まれているか、またはカンマのみで構成されているか
  
  // カンマで分割し、空でない要素が1つ以上存在するか確認する。
  // 末尾のカンマは許容されるため、末尾のカンマで終わっていても許容する。
  
  // 末尾のカンマを取り除き、カンマで分割して、空でない要素があるか確認する。
  const lineWithoutTrailingComma = trimmedLine.endsWith(',') ? trimmedLine.slice(0, -1) : trimmedLine;
  
  if (lineWithoutTrailingComma.length === 0) {
    // 空行またはカンマのみの行 ("" または ",") は妥当ではない
    return;
  }
  
  const parts = lineWithoutTrailingComma.split(',');
  
  // 1個以上の数字列が存在するか確認する
  const non_empty_parts = parts.filter(p => p.trim() !== "");
  
  if (non_empty_parts.length >= 1) {
    // 1個以上の数字列がカンマで区切られている
    validLines++;
  } else {
    // カンマのみの場合 (例: "," または "") は除外されるべきだが、上記で "" は除外済み。
    // したがって、カンマのみの行（例: ","）は妥当ではない。
    // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」なので、数字列が0個はNG。
  }
});

rl.on('close', () => {
  console.log(`valid=${validLines}`);
});
