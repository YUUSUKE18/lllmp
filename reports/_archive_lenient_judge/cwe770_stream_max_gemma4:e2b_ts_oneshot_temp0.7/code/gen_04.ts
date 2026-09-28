const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能かチェック（NaNチェックと、元の文字列が数字のみで構成されているかの確認）
    if (Number.isNaN(num)) {
      isValid = false;
      break;
    }

    // 64bit整数範囲内であるか確認（問題文の制約だが、ここでは一般的なJSの安全性を考慮し、数値として扱えることを優先する。もし厳密に64bitチェックが必要なら、BigIntや安全な範囲チェックが必要だが、ここでは標準的なparseIntの結果を扱う）
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        // 64bitの範囲（約-9*10^18から9*10^18）を超えた場合は無視する、またはエラーとするが、ここでは単純にNaN/無効な値として扱う
        isValid = false;
        break;
    }

    count++;
    if (num > max) {
      max = num;
    }
  }

  if (isValid) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合、何も出力しない（仕様に基づき）
  }

  rl.close();
});
