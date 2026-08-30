const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let numbers: number[] = [];
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart) {
      const num = parseInt(trimmedPart, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = [...new Set(numbers)];
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 厳密に1行だけ出力
  console.log(`count=${count} sum=${sum}`);
});
