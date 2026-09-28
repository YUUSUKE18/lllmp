const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  // カンマで分割し、各要素を整数に変換しようと試みる
  const numbers = line.split(',').map(s => s.trim());

  let uniqueNumbers = new Set<number>();
  let sum: bigint = 0n;

  for (const numStr of numbers) {
    if (numStr === '') continue;

    // 数値として解析を試みる
    const num = parseInt(numStr, 10);

    // 整数として有効であり、かつ重複していないかチェック
    if (!isNaN(num)) {
      uniqueNumbers.add(num);
    }
  }

  // 重複を除いた要素の個数と合計を計算
  const count = uniqueNumbers.size;
  let totalSum = 0n;
  for (const num of uniqueNumbers) {
    totalSum += BigInt(num);
  }

  // 結果を出力
  console.log(`count=${count} sum=${totalSum}`);

  rl.close();
});
