const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const parts = line.split(',');
  let count = 0;
  let max = -Infinity;
  let isValid = true;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = Number(trimmedPart);

    // 整数として解釈可能かチェック（NaNや無限大は除外）
    if (!isNaN(num) && isFinite(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 厳密に1行だけ出力
  console.log(`count=${count} max=${max}`);
  rl.close();
});
