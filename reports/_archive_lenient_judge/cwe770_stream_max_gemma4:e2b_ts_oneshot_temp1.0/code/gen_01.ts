const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を数値に変換しようとする
  const numbers = line.split(',');
  let count = 0;
  let maxValue = -Infinity;
  let validCount = 0;

  for (const item of numbers) {
    const trimmedItem = item.trim();
    if (trimmedItem === "") continue;

    const num = parseInt(trimmedItem, 10);

    // 数値として解釈でき、かつ64bitの範囲内（ここでは安全のため）のチェック
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      validCount++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 厳密に1行だけ出力
  console.log(`count=${validCount} max=${maxValue}`);
  rl.close();
});
