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
    const match = part.match(/(\d+):(\d+)/);
    if (match) {
      const value = parseInt(match[1], 10);
      const count = parseInt(match[2], 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 要素数 (value * count)
        totalCount += BigInt(value) * BigInt(count);
        // 合計 (value * count)
        totalSum += BigInt(value) * BigInt(count);
      }
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});

rl.on('close', () => {
  // 処理が完了したことを示す（この問題ではlineイベントで直接出力するため、ここでは特に何もしない）
});
