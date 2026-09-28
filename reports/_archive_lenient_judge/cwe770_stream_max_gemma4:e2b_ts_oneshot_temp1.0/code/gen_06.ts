const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を数値に変換する
  const parts = line.split(',');
  let count = 0;
  let maxVal = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = Number(trimmedPart);

    // 整数として解釈できるかチェックし、64bit範囲内かチェック
    if (!isNaN(num) && Number.isInteger(num) && num >= -(2**53) && num <= (2**53 - 1)) {
      count++;
      if (num > maxVal) {
        maxVal = num;
      }
      hasValidNumber = true;
    }
  }

  // 有効な数値が見つかった場合のみ結果を出力する（仕様を厳密に解釈するため）
  if (hasValidNumber) {
    console.log(`count=${count} max=${maxVal}`);
  }
});

rl.on('close', () => {
  // 入力が終了したときの処理（この場合は通常は不要だが、readlineの動作としておく）
});
