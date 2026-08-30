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

    // 整数として解釈できるか、および64bit範囲内かをチェック
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    } else {
      // 整数として解釈できない要素は無視する（仕様に基づき）
      isValid = false; // この実装では、有効な数だけをカウントし最大値を求める
    }
  }

  // 厳密に count=<個数> max=<最大値> を出力
  console.log(`count=${count} max=${max}`);
  rl.close();
});
