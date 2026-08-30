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
  let maxValue = -Infinity;

  for (const item of numbers) {
    const num = parseInt(item, 10);
    // 整数として解釈でき、かつ64bit範囲内（ここでは単純に数値として扱う）の要素のみを考慮
    if (!isNaN(num)) {
      count++;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  // 結果を出力
  console.log(`count=${count} max=${maxValue}`);
});

rl.on('close', () => {
  // 入力が終了した後の処理（この問題ではlineごとに処理するため、ここでは特に何もしない）
});
