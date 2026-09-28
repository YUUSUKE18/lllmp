const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.trim().split(',');
  let totalCount = 0n;
  let totalSum = 0n;

  for (const part of parts) {
    if (part.includes(':')) {
      const [valueStr, countStr] = part.split(':');
      const value = parseInt(valueStr.trim(), 10);
      const count = parseInt(countStr.trim(), 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 要素数: count
        totalCount += BigInt(count);
        // 合計: value * count
        totalSum += BigInt(value) * BigInt(count);
      }
    }
  }

  // 厳密に 1 行だけ出力
  console.log(`count=${totalCount} sum=${totalSum}`);
  rl.close();
});
