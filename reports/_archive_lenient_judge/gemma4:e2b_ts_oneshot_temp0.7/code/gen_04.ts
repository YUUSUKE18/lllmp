const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  // カンマで分割し、各要素を整数に変換
  const numbers = line.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

  // 重複を除いた集合を作成
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // 合計は64bit整数として扱う（Node.jsのNumber型で十分だが、明示的に注意）
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 指定された形式で出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // データがすべて処理された後、プロセスを終了
});
