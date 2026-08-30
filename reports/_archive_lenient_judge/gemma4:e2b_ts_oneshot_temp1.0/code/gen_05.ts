const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === '') return;

  // カンマで分割し、各要素を整数に変換しようと試みる
  const parts = line.split(',');
  let numbers: number[] = [];
  for (const part of parts) {
    const num = parseInt(part.trim(), 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = [...new Set(numbers)];

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // 合計は64bit整数に収まるため、標準のNumber型で十分だが、念のためBigIntを使用せず通常の数値で計算
  let sum = 0;
  for (const n of uniqueNumbers) {
    sum += n;
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // データが全て処理された後のクリーンアップ（今回は不要だが習慣として）
});
