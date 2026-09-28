const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const parts = line.split(',');
  let numbers = [];
  for (const part of parts) {
    const num = parseInt(part.trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(numbers));
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});
