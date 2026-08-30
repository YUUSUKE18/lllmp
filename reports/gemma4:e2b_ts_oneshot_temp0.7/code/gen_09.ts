const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const parts = line.split(',');
  let numbers = [];

  for (const part of parts) {
    const num = parseInt(part.trim(), 10);
    // 整数として解釈でき、かつ有効な数（NaNでない）のみを格納
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  // 重複を除いた集合を作成
  const uniqueNumbers = Array.from(new Set(numbers));

  // 個数と合計を計算
  const count = uniqueNumbers.length;
  // 合計は64bit整数に収まるため、標準のNumber型で十分（JavaScriptでは安全性が高い）
  const sum = uniqueNumbers.reduce((acc, val) => acc + val, 0);

  // 結果を出力
  console.log(`count=${count} sum=${sum}`);
});
