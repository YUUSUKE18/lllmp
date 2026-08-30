const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を数値に変換しようとする
  const numbers = line.split(',').map(s => s.trim());
  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const numStr of numbers) {
    if (numStr === "") continue;
    const num = parseInt(numStr, 10);

    // 数値として解釈でき、64bit整数範囲内か確認（ここでは単純にNaNチェックと数値の比較で代用）
    if (!isNaN(num)) {
      validCount++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 厳密に出力
  console.log(`count=${validCount} max=${maxValue}`);
  rl.close();
});
