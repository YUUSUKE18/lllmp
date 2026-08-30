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
    .map(s => parseInt(s, 10))
    .filter(n => !Number.isNaN(n));

  // 重複を除いた整数を求めるためにSetを使用する
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算する
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力する
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 全ての入力が処理された後、何も出力する必要はない（Lineごとに即時出力するため）
});
