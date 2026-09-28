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
    if (part.trim() !== "") {
      const num = parseInt(part.trim(), 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }

  // 重複を除いた整数を取得
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
});
