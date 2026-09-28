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
  // 入力をカンマで分割し、空白を無視する
  const parts = input.trim().split(',').map(s => s.trim()).filter(s => s.length > 0);

  if (parts.length === 0) {
    console.log('count=0 sum=0');
    return;
  }

  // 重複を除いた整数をセットに格納
  const uniqueNumbers = new Set<number>();
  for (const part of parts) {
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 個数と合計を計算
  const count = uniqueNumbers.size;
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});
