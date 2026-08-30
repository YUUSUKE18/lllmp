const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
  
  let count = 0;
  let maxVal = -Infinity;

  for (const numStr of numbers) {
    const num = parseInt(numStr, 10);
    // 整数として解釈でき、かつ64bit範囲内（ここではNumber型で十分）の要素のみを考慮する
    if (!isNaN(num)) {
      count++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 厳密に count=<個数> max=<最大値> を出力する
  console.log(`count=${count} max=${maxVal}`);
});

rl.on('close', () => {
  // 入力終了後の処理（この問題ではlineごとに処理が完了するため、ここでは特に何もする必要はない）
});
