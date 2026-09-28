const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  // カンマで分割し、各要素を整数に変換しようと試みる
  const parts = line.split(',');
  let numbers: number[] = [];

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;
    const num = parseInt(trimmedPart, 10);
    // 数値として解釈でき、かつ整数であるかを確認（NaNチェックはparseIntで既に実施されているが念のため）
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた整数を求める
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);

  rl.close();
});
