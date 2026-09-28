const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let input = '';

rl.on('line', (line) => {
  input += line + '\n';
});

rl.on('close', () => {
  const parts = input.trim().split(',');
  let count = 0;
  let maxVal = -Infinity;

  for (const part of parts) {
    if (part === '') continue;
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
      count++;
      if (num > maxVal) {
        maxVal = num;
      }
    }
  }

  // 仕様: 要素数と最大値を求め、`count=<個数> max=<最大値>` の1行で出力する。
  console.log(`count=${count} max=${maxVal}`);
});
