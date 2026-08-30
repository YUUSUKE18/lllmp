const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  // カンマで分割し、各要素を整数に変換する
  const numbers = line.split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      const num = parseInt(s, 10);
      return isNaN(num) ? NaN : num;
    })
    .filter(n => !isNaN(n));

  if (numbers.length > 0) {
    const count = numbers.length;
    // 数値が64bit整数に収まることを前提とする
    const maxValue = Math.max(...numbers);
    console.log(`count=${count} max=${maxValue}`);
  } else {
    // 入力が空または無効な場合も、仕様に従い何も出力しない（または適切なエラー処理。ここでは何も出力しない）
  }

  rl.close();
});
