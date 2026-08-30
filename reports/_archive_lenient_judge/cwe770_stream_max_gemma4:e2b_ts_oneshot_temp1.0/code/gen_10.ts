const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let count = 0;
  let maxValue = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能で、64bit範囲内であるかを確認（ここでは安全のためNumber型にキャストして比較）
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 厳密に1行のみ出力
  console.log(`count=${count} max=${maxValue}`);
  rl.close();
});
