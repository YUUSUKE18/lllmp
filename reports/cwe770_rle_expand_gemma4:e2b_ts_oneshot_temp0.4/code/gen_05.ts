const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.trim().split(',');
  let totalCount = 0;
  let totalSum = 0;

  for (const part of parts) {
    if (!part) continue;
    const [valueStr, countStr] = part.split(':');
    if (!valueStr || !countStr) continue;

    const value = parseInt(valueStr, 10);
    const count = parseInt(countStr, 10);

    // 値と回数が有効な整数であり、回数が0以上であることを確認
    if (!isNaN(value) && !isNaN(count) && count >= 0) {
      totalCount += count;
      totalSum += value * count;
    }
  }

  // 厳密に 1 行だけ出力
  console.log(`count=${totalCount} sum=${totalSum}`);
  rl.close();
});
