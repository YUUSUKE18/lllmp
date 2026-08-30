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
  
  let uniqueNumbers = new Set<number>();
  for (const numStr of numbers) {
    const num = parseInt(numStr, 10);
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 個数と合計を計算する
  const count = uniqueNumbers.size;
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力する
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 標準入力が終了した後に処理が完了する
});
