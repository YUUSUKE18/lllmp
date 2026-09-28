const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let validNumbersFound = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // チェック：整数として解釈できるか、かつ64bit範囲内か（ここでは一般的なJSのNumber型で十分）
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      validNumbersFound = true;
    }
  }

  // 整数として解釈できた要素のみをカウントし、最大値を求める
  if (validNumbersFound) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 有効な整数が一つもなかった場合（空行や非数値のみの場合）
    console.log(`count=0 max=-Infinity`); // または仕様に応じて適切な値。ここでは最大値の初期値に合わせる。
  }

  rl.close();
});
