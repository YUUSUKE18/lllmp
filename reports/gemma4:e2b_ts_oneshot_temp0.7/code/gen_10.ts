const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

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

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // 合計は64bit整数の範囲に収まるため、標準のNumber型で十分だが、念のためBigIntとして扱うことも可能。
  // ここでは問題の制約に従い、通常の数値演算を行う。
  let sum = 0;
  for (const num of uniqueNumbers) {
    sum += num;
  }

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});
