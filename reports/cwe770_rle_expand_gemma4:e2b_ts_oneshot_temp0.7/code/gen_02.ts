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
    if (!part) continue;
    const [valueStr, countStr] = part.split(':');

    if (valueStr && countStr) {
      const value = parseInt(valueStr, 10);
      const count = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 要素数と合計は64bit整数として扱う
        totalCount += BigInt(count);
        totalSum += BigInt(value) * BigInt(count);
      }
    }
  }

  // 厳密に 1 行だけ出力
  console.log(`count=${totalCount.toString()} sum=${totalSum.toString()}`);
  rl.close();
});
